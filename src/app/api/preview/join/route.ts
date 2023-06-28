import { cookies } from "next/headers";
import { z } from "zod"
import { prisma } from "~/server/db"

const joinCallSchema = z.object({
    callName: z.string(),
    username: z.string(),
})

interface JoinCallBody {
    name: string;
}

export async function POST(req: Request) {

    try {
        const json: JoinCallBody = await req.json() as JoinCallBody;
        const body = joinCallSchema.parse(json)

        const call = await prisma.call.findFirst({
            where: { status: 'created', name: body.callName },
        });
      
        if (!call || call.status === 'ended') {
            return new Response("Not Found", { status: 404 })
        }
    
        const participant = await prisma.participant.create({
                data: {
                    callName: call.name,
                    name: body.username,
                    role: "guest",
                    status: 'joined',
                    callId: call.id,
                    startTime: new Date()
                },
        });

        cookies().set('room-id', call.id)
        
        return new Response(JSON.stringify(participant))

    } catch (error) {
        console.log(error)
        return new Response(null, { status: 500 })
    }

}