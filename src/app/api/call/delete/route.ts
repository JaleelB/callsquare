import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "~/lib/session";
import { prisma } from "~/server/db";

const deleteSchema = z.object({
    callId: z.string().min(8),
});

interface DeleteCallBody {
    callId: string;
}

export async function POST (req: Request) {

    const user = await getCurrentUser();
    
    if (!user) {
        return new Response("Unauthorized", { status: 403 })
    }  

    const json: DeleteCallBody = await req.json() as DeleteCallBody;
    const { callId } = deleteSchema.parse(json)

    try {
        await prisma.call.delete({
            where: { 
                id: callId,
                userId: user.id,
            },
        });

        return NextResponse.json({success: true });

    } catch (error) {
        return NextResponse.json({ success: false, error: "Call could not be created." });
    }
}
