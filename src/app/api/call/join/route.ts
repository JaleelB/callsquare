import { getServerSession } from "next-auth/next"
import { cookies } from "next/headers"
import { z } from "zod"
import { authOptions } from "~/server/auth"
import { prisma } from "~/server/db"

const joinCallSchema = z.object({
    name: z.string().optional(),
    id: z.string().uuid(),
    audio: z.boolean().optional(),
    video: z.boolean().optional(),
})

interface JoinCallBody {
    id: string;
    name?: string;
    audio?: boolean;
    video?: boolean;
}

export async function POST(req: Request) {

    try {
        const session = await getServerSession(authOptions)
    
        if (!session) {
            return new Response("Unauthorized", { status: 403 })
        }
    
        const { user } = session
        if (!user || !user.id || !user.name || !user.email ) {
            throw new Error('You must be logged in to join a call');
        }   

        const json: JoinCallBody = await req.json() as JoinCallBody;
        const body = joinCallSchema.parse(json)

        const call = await prisma.call.findFirst({
            where: { status: 'created', name: body.id },
        });
      
        if (!call || call.status === 'ended') {
            return new Response("Not Found", { status: 404 })
        }
    
        let participant = await prisma.participant.findUnique({
            where: { id: user.id },
        });
        
        if (!participant) {
            participant = await prisma.participant.create({
                data: {
                    callName: call.name,
                    userId: user.id,
                    email: user.email,
                    name: body.name ? body.name : user.name,
                    role: "guest",
                    status: 'joined',
                    callId: call.id,
                    startTime: new Date()
                },
            });
        } else {
            participant = await prisma.participant.update({
                where: { id: user.id },
                data: { 
                    callName: call.name,
                    status: 'joined',
                    startTime: new Date()
                },
            });
            
        }

        cookies().set('room-id', call.id)
        
        return new Response(JSON.stringify(participant))

    } catch (error) {
        console.log(error)
        return new Response(null, { status: 500 })
    }

  }