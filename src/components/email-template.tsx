/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface InviteUserEmailProps {
  recipientUsername?: string;
  senderImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  inviteLink?: string;
}

export const InviteEmail: React.FC<Readonly<InviteUserEmailProps>> = ({
  recipientUsername = "zenorocha",
  senderImage,
  invitedByUsername = "bukinoshita",
  invitedByEmail = "bukinoshita@gmail.com",
  inviteLink,
}: InviteUserEmailProps) => {
  const previewText = `Join ${invitedByUsername} on Callsquare`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={senderImage}
                width="40"
                height="37"
                alt="Profile"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join <strong>{invitedByUsername}</strong> on{" "}
              <strong>Callsquare</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {recipientUsername},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the join their call on{" "}
              <strong>Callsquare</strong>.
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                //pX={20}
                //pY={12}
                style={{
                  padding: "12px 20px",
                }}
                className="rounded bg-[#0F172A] text-center text-[12px] font-semibold text-white no-underline"
                href={inviteLink}
              >
                Join the call
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for{" "}
              <span className="text-black">{recipientUsername} </span>. If you
              were not expecting this invitation, you can ignore this email. If
              you are concerned about your account's safety, please reply to
              this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
