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
} from '@react-email/components';
import * as React from 'react';
  
interface InviteUserEmailProps {
    recipientUsername?: string;
    senderImage?: string;
    invitedByUsername?: string;
    invitedByEmail?: string;
    inviteLink?: string;
}

export default function InviteEmail ({
    recipientUsername = 'zenorocha',
    senderImage,
    invitedByUsername = 'bukinoshita',
    invitedByEmail = 'bukinoshita@gmail.com',
    inviteLink,
}: InviteUserEmailProps) {

    const previewText = `Join ${invitedByUsername} on Callsquare`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans">
                <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                    <Section className="mt-[32px]">
                        <Img
                            src={senderImage}
                            width="40"
                            height="37"
                            alt="Profile"
                            className="my-0 mx-auto"
                        />
                    </Section>
                    <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                        Join <strong>{invitedByUsername}</strong> on <strong>Callsquare</strong>
                    </Heading>
                    <Text className="text-black text-[14px] leading-[24px]">
                        Hello {recipientUsername},
                    </Text>
                    <Text className="text-black text-[14px] leading-[24px]">
                        <strong>{invitedByUsername}</strong> (
                        <Link
                            href={`mailto:${invitedByEmail}`}
                            className="text-blue-600 no-underline"
                        >
                            {invitedByEmail}
                        </Link>
                        ) has invited you to the join their call on{' '}
                        <strong>Callsquare</strong>.
                    </Text>
                    <Section className="text-center mt-[32px] mb-[32px]">
                        <Button
                            pX={20}
                            pY={12}
                            className="bg-[#0F172A] rounded text-white text-[12px] font-semibold no-underline text-center"
                            href={inviteLink}
                        >
                            Join the call
                        </Button>
                    </Section>
                    <Text className="text-black text-[14px] leading-[24px]">
                        or copy and paste this URL into your browser:{' '}
                        <Link
                            href={inviteLink}
                            className="text-blue-600 no-underline"
                        >
                            {inviteLink}
                        </Link>
                    </Text>
                    <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                    <Text className="text-[#666666] text-[12px] leading-[24px]">
                        This invitation was intended for{' '}
                        <span className="text-black">{recipientUsername} </span>. If you were not
                        expecting this invitation, you can ignore this email. If you are
                        concerned about your account's safety, please reply to this email to
                        get in touch with us.
                    </Text>
                </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}