import { getServerSession } from "next-auth/next"
import { z } from "zod"
import { env } from "~/env.mjs"
import { authOptions } from "~/server/auth"
import { prisma } from "~/server/db"
import { cookies } from 'next/headers'
import { generateManagementToken } from "~/server/management-token"

const callCreateSchema = z.object({
    name: z.string().uuid(),
    audio: z.boolean(),
    video: z.boolean(),
})

interface CallCreateBody {
    name: string;
}

type Room = {
    id: string;
};

export async function POST(req: Request) {

    try {
        const session = await getServerSession(authOptions)
    
        if (!session) {
            return new Response("Unauthorized", { status: 403 })
        }
    
        const { user } = session
        if (!user || !user.id || !user.name || !user.email) {
            throw new Error('You must be logged in to create a call');
        }   

        const json: CallCreateBody = await req.json() as CallCreateBody;
        const body = callCreateSchema.parse(json)

        const roomId = await createRoom(body.name);
        const existingCall = await prisma.call.findUnique({
            where: { id: roomId },
        });
          
        if (existingCall) {
            throw new Error('A call with this ID already exists');
        }
        
        const newCall = await prisma.call.create({
            data: {
                id: roomId,
                name: body.name,
                userId: user.id,
                title: user.name + "'s Call",
                startTime: new Date(),
                status: 'created',
                endTime: null,
            },
        });
          
        if (!newCall) {
            throw new Error('Error creating call');
        }

        const inviteLink = `${env.NEXT_PUBLIC_APP_URL}/call/${newCall.id}`;

        // Update the call with the invite link
        await prisma.call.update({
            where: { id: newCall.id },
            data: { inviteLink },
        });

        
        await prisma.participant.create({
            data: {
                userId: user.id,
                name: user.name,
                email: user.email,
                role: 'host',
                status: 'joined',
                callId: newCall.id,
                startTime: new Date(),
            },
        });

        //store room code in session
        cookies().set('room-id', newCall.id)
    
        return new Response(JSON.stringify({ success: true }));

    } catch (error) {
        console.log(error)
        return new Response(null, { status: 500 })
    }

}

async function createRoom(name: string){

    const managementToken = await generateManagementToken();

    const response = await fetch(`${env.TOKEN_ENDPOINT}/rooms`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${managementToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        template_id: env.TEMPLATE_ID,
        region: 'us'
      })
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { id }: Room = await response.json() as Room;
    return id;
}


