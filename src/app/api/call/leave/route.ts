import { prisma } from "~/server/db";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { z } from "zod";

const leaveCallSchema = z.object({
    callName: z.string().uuid(),
    roomId: z.string().min(8),
})

interface leaveCallBody {
    callName: string;
    roomId: string
}

interface Participant {
    id: string;
    callName: string;
    userId: string;
    name: string;
    email: string;
    role: string;
    status: string;
    startTime: Date | null;
    endTime: Date | null;
}

export async function PATCH(req: Request) {

    try{
        const session = await getServerSession(authOptions)
    
        if (!session) {
            return new Response("Unauthorized", { status: 403 })
        }
    
        const { user } = session
        if (!user || !user.id || !user.name || !user.email ) {
            throw new Error('You must be logged in to join a call');
        }   

        const json: leaveCallBody = await req.json() as leaveCallBody;
        const body = leaveCallSchema.parse(json)

        const participant = await prisma.participant.findFirst({
            where: { 
                userId: user.id,
                callName: body.callName,
            },
        });
          
        if (!participant) {
            throw new Error('Participant not found');
        }

        const endTime = new Date();
        const updatedParticipant: Participant = await prisma.participant.update({
            where: { 
                id: participant.id,
            },
            data: { 
              status: 'left', 
              endTime
            },
        });

        // Check if there are any other participants in the call
        const otherParticipants: Participant[] = await prisma.participant.findMany({
            where: {
                callName: updatedParticipant.callName,
                status: 'joined',
            },
        });

        // If there are no other participants, end the call
        if (otherParticipants.length === 0) {
            await prisma.call.update({
                where: { id: body.roomId },
                data: { 
                    status: 'ended',
                    endTime,
                    duration: endTime.getTime() - (participant?.startTime as Date).getTime() 
                },
            });

        }
      
        return new Response(JSON.stringify(updatedParticipant))

    } 
    catch (error) {
        console.log(error)
        return new Response(null, { status: 500 })
    }
}
