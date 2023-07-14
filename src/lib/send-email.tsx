import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import InviteEmail from '~/components/ui/email';
import { env } from '~/env.mjs';

export type EmailProps = {
  recipient: string, 
  link: string, 
  recipientUsername: string, 
  senderImage: string, 
  invitedByUsername: string, 
  invitedByEmail: string
}

export async function sendEmail(props: EmailProps) {

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    secure: true,
    auth: {
      user: env.EMAIL_FROM,
      pass: env.EMAIL_PASSWORD
    },
  });

  // Render the email component to a string.
  const html = render(
    <InviteEmail 
      recipientUsername={props.recipientUsername} 
      senderImage={props.senderImage} 
      invitedByUsername={props.invitedByUsername} 
      invitedByEmail={props.invitedByEmail}
      inviteLink={props.link} 
    />
  );

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to: props.recipient,
    subject: 'Invitation to Join Call on Callsquare',
    html,
  });
}
