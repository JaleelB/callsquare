import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import InviteEmail  from '../components/ui/email';
import { env } from '~/env.mjs';

export async function sendEmail(
  recipient: string, 
  link: string, 
  recipientUsername: string, 
  senderImage: string, 
  invitedByUsername: string, 
  invitedByEmail: string
) {

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false,
    auth: {
      user: env.EMAIL_FROM,
      pass: env.EMAIL_PASSWORD
    },
  });

  // Render the email component to a string.
  const html = render(
    <InviteEmail 
      recipientUsername={recipientUsername} 
      senderImage={senderImage} 
      invitedByUsername={invitedByUsername} 
      invitedByEmail={invitedByEmail}
      inviteLink={link} 
    />
  );

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to: recipient,
    subject: 'Invitation to Join Call on Callsquare',
    html,
  });
}
