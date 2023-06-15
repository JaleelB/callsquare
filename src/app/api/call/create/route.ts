import { getServerSession } from "next-auth/next"
import { z } from "zod"
import { env } from "~/env.mjs"
import { authOptions } from "~/server/auth"
import { prisma } from "~/server/db"

const callCreateSchema = z.object({
    id: z.string().uuid(),
})

interface CallCreateBody {
    id: string;
}

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

        const newCall = await prisma.call.create({
            data: {
                id: body.id,
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
        const updatedCall = await prisma.call.update({
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
            },
        });
    
        return new Response(JSON.stringify(updatedCall))

    } catch (error) {
      return new Response(null, { status: 500 })
    }

  }