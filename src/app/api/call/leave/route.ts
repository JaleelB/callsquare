import { prisma } from "~/server/db";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

export async function PATCH() {

    try{
        const session = await getServerSession(authOptions)
    
        if (!session) {
            return new Response("Unauthorized", { status: 403 })
        }
    
        const { user } = session
        if (!user || !user.id || !user.name || !user.email ) {
            throw new Error('You must be logged in to join a call');
        }   

        const participant = await prisma.participant.findFirst({
            where: { 
              userId: user.id,
            },
        });
          
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
              endTime, 
            },
        });

        // Check if there are any other participants in the call
        const otherParticipants = await prisma.participant.findMany({
            where: {
                callId: participant.callId,
                status: 'joined',
            },
        });
    
        //room is not ending when last participant leaves. debug why

        // If there are no other participants, end the call
        if (otherParticipants.length === 0) {
            await prisma.call.update({
                where: { id: participant.callId },
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
