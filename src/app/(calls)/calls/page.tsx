import { type Metadata } from "next";
import Link from "next/link";
import { CardContainer, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/card";
import Badge from "~/components/ui/badge";
import Button from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
import { formatDate } from "~/lib/date";
import { getCurrentUser } from "~/lib/session";

export const metadata: Metadata = {
    title: "CallSquare - Calls Hub",
    description: "Access your CallSquare Calls Hub to manage and join your video calls seamlessly.",
}

const cardsData = [
    {
      title: "Create a call",
      description: "Create a call and invite others to join you.",
      icon: <Icons.video color="white" width={24} height={14} />,
      buttonText: "Create",
      buttonIcon: <Icons.add color="#0F172A" className="ml-2" width={16} height={16} />,
    },
    {
      title: "Join a call",
      description: "Join a call by entering the call link or code.",
      icon: <Icons.add color="white" width={16} height={16} />,
      buttonText: "Join",
      buttonIcon: <Icons.add color="#0F172A" className="ml-2" width={16} height={16} />,
    },
    {
      title: "Invite Participants",
      description: "Invite friends or other participants to join your call.",
      icon: <Icons.invite color="white" width={24} height={24} />,
      buttonText: "Invite",
      buttonIcon: <Icons.add color="#0F172A" className="ml-2" width={16} height={16} />,
    }
];

export default async function CallsPage(){

    const user = await getCurrentUser()

    return (
        <div className="w-full">
            <section className="container max-w-[1400px] space-y-6 mb-8 md:mb-12 lg:mb-16 mx-auto">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div>
                        <Badge date={formatDate(new Date())}/>
                        <h1 className="mt-4 text-4xl text-slate-900 md:text-5xl lg:text-6xl font-bold leading-none px-4 md:px-8">
                            {`Welcome ${user?.name as string}`}
                        </h1>
                    </div>
                </div>
            </section>
            <section className="space-y-6 mx-auto">
                <div className="w-full max-w-[1200px] text-center mx-auto">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center lg:gap-5 px-4 md:px-8">
                        {cardsData.map((card, index) => (
                            <CardContainer key={index} className="w-full h-[230px]">
                                <CardHeader className="flex justify-between">
                                <div className="w-[50px] h-[50px] flex items-center justify-center bg-slate-900 rounded-md">
                                    {card.icon}
                                </div>
                                <Button size="sm" variant="transparent" className="shadow rounded-full">
                                    {card.buttonText}
                                    {card.buttonIcon}
                                </Button>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle>{card.title}</CardTitle>
                                    <CardDescription>{card.description}</CardDescription>
                                </CardContent>
                            </CardContainer>
                        ))}
                    </div>
                    <Button size="lg" className="rounded-full mx-auto mt-8 md:mt-12">
                        <Link href="/calls/history" className="inline-flex items-center">
                            View Call History
                            <Icons.arrow color="white" width={14} height={14} className="ml-2 rotate-90"/>
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}