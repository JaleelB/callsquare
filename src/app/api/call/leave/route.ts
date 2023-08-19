import { prisma } from "~/server/db";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { z } from "zod";
import { env } from "~/env.mjs";
import { generateManagementToken } from "~/server/management-token";

const leaveCallSchema = z.object({
    callName: z.string().uuid(),
    roomId: z.string().min(8),
    userName: z.string().min(1).optional(),
})

interface leaveCallBody {
    callName: string;
    roomId: string
    userName?: string;
}

export async function PATCH(req: Request) {

    try{
        const session = await getServerSession(authOptions)
        const json: leaveCallBody = await req.json() as leaveCallBody;
        const body = leaveCallSchema.parse(json)
        let participant;

        if (session) {
            const { user } = session
            participant = await prisma.participant.findFirst({
                where: { 
                    userId: user.id,
                    callName: body.callName,
                },
            });
        } else {

            participant = await prisma.participant.findFirst({
                where: { 
                    name: body.userName,
                    callName: body.callName,
                },
            });
        }
          
        if (!participant) {
            throw new Error('Participant not found');
        }

        const endTime = new Date();
        const updatedParticipant = await prisma.participant.update({
            where: { 
                id: participant.id,
            },
            data: { 
              status: 'left', 
              endTime
            },
        });

        // Check if there are any other participants in the call
        const otherParticipants = await prisma.participant.findMany({
            where: {
                callName: updatedParticipant.callName,
                status: 'joined',
            },
        });

        if (otherParticipants.length === 0) {
            
            const managementToken = await generateManagementToken();
            const response = await fetch(`${env.TOKEN_ENDPOINT}/active-rooms/${body.roomId}/end-room`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${managementToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lock: true
                })
            })
            
            if(response?.ok){
                await prisma.call.update({
                    where: { id: body.roomId },
                    data: { 
                        status: 'ended',
                        endTime,
                        duration: endTime.getTime() - (participant?.startTime as Date).getTime() 
                    },
                });
            }
        }
      
        return new Response(JSON.stringify(updatedParticipant))

    } 
    catch (error) {
        console.log(error)
        return new Response(null, { status: 500 })
    }
}
