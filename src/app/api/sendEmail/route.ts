import { NextResponse } from 'next/server';
import { type EmailProps, sendEmail } from '~/lib/send-email';

export async function POST(req: Request) {
    const body = await req.json() as EmailProps;
    await sendEmail(body);
    return NextResponse.json({ message: 'Email sent successfully' });
}
