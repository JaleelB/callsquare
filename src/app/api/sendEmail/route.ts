// import { NextResponse } from 'next/server';
// import { type EmailProps, sendEmail } from '~/lib/send-email';

// export async function POST(req: Request) {
//     const body = await req.json() as EmailProps;
//     await sendEmail(body);
//     return NextResponse.json({ message: 'Email sent successfully' });
// }

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { env } from '~/env.mjs';
import { type EmailProps } from '~/types/types';
import { z } from "zod"
import { InviteEmail } from '~/components/email-template';

const resend = new Resend(env.RESEND_API_KEY);

export const emailSchema = z.object({
    recipient: z.string(),
    link: z.string(),
    recipientUsername: z.string(),
    senderImage: z.string(),
    invitedByUsername: z.string(),
    invitedByEmail: z.string(),
});

export async function POST(req: Request) {

    const json: EmailProps = await req.json() as EmailProps;
    const body = emailSchema.parse(json);
    
    try {
        const data = await resend.emails.send({
            from: body.invitedByEmail,
            to: body.recipient,
            subject: 'Invitation to join call on Callsquare',
            react: (
                InviteEmail({ 
                    recipientUsername: body.recipientUsername,
                    senderImage: body.senderImage,
                    invitedByUsername: body.invitedByUsername,
                    invitedByEmail: body.invitedByEmail,
                    inviteLink: body.link
                })
            ),
        });

        return NextResponse.json({
            data: data,
        });
        
  } catch (error) {
    return NextResponse.json({ error });
  }
}
