import { getServerSession } from "next-auth/next"
import { z } from "zod"
import { env } from "~/env.mjs"
import { authOptions } from "~/server/auth"
import { prisma } from "~/server/db"
import { generateManagementToken } from "~/server/management-token"

const roomCodeSchema = z.object({
    callName: z.string(),
})

interface RoomCodeBody {
    callName: string;
}

type RoomCode = {
    code: string;
};

export async function POST(req: Request) {

    try {
        const session = await getServerSession(authOptions)
    
        if (!session) {
            return new Response("Unauthorized", { status: 403 })
        }
    
        const { user } = session
        if (!user || !user.id ) {
            throw new Error('You must be logged in to get a room code');
        }   

        const json: RoomCodeBody = await req.json() as RoomCodeBody;
        const body = roomCodeSchema.parse(json)

        const call = await prisma.call.findFirst({
            where: { status: 'created', name: body.callName },
        });

        if (!call || call.status === 'ended') {
            return new Response("Not Found", { status: 404 })
        }

        const participant = await prisma.participant.findUnique({
            where: { id: user.id },
        });

        const roomId = call.id;
        const role = participant ? participant.role : "guest";

        const token = await generateManagementToken();
        const response = await fetch(`${env.TOKEN_ENDPOINT}/room-codes/room/${roomId}/role/${role}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const { code }: RoomCode = await response.json() as RoomCode;
        return new Response(JSON.stringify({ code }));

    } catch (error) {
        console.error(error)
        return new Response(null, { status: 500 })
    }
}
