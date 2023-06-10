import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import InviteEmail  from '../components/ui/email';


export async function sendEmail(
  senderEamil: string, 
  senderToken: string, 
  recipient: string, 
  link: string, 
  recipientUsername: string, 
  senderImage: string, 
  invitedByUsername: string, 
  invitedByEmail: string
) {
  // Create a Nodemailer transporter using the user's email and token.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: senderEamil,
      accessToken: senderToken,
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
    from: senderEamil,
    to: recipient,
    subject: 'Invitation to Join Call on Callsquare',
    html,
  });
}
