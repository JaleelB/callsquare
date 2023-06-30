import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/session";
import { prisma } from "~/server/db";

export default async function HistoryPage(){

    const user = await getCurrentUser()

    if (!user) {
      redirect("/login")
    }
  
    const calls = await prisma.call.findMany({
        where: { 
            userId: user.id,
        },
        include: {
            participants: true,
        },
        orderBy: {
            startTime: 'desc',
        },
    });
    
    return (
        <div className="container max-w-5xl mb-8 md:mb-12 lg:mb-16 mx-auto px-4 md:px-8">
            <h1 className="text-3xl text-slate-900 md:text-4xl lg:text-5xl font-bold leading-tight mb-6 md:mb-16">Call History</h1>
            <div className="flex flex-col gap-2 md:gap-4">
                {calls.map((call, index) => (
                    <div key={index} className="flex gap-12 sm:gap-0 justify-between pb-4 border-b">
                        <h2 className="truncate">{call.name}</h2>
                        <p>{new Date(call.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}