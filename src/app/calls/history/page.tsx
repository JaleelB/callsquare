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
        take: 30,
    });
    
    return (
        <div className="container max-w-5xl mb-8 md:mb-12 lg:mb-16 mx-auto px-4 md:px-8">
            <h1 className="text-3xl text-slate-900 md:text-4xl lg:text-5xl font-bold leading-tight mb-6 md:mb-10 lg:mb-16">Call History</h1>
            <div className="flex gap-12 sm:gap-0 justify-between py-4 mb-2 border-b">
                <h2>Call Name</h2>
                <div className="flex gap-6">
                    <p className="hidden sm:block text-center">Date</p>
                    <p className="text-center">Start Time</p>
                    <p className="hidden sm:block text-center">End Time</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 md:gap-4">
                {
                    calls.length !== 0 ? (
                        calls.map((call, index) => (
                            <div key={index} className="flex gap-12 sm:gap-0 justify-between pb-4 border-b">
                                <h2 className="truncate">{call.name}</h2>
                                <div className="flex gap-6">
                                    <div className="hidden sm:flex gap-6">
                                        <p>{new Date(call.startTime).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</p>
                                        <p>{new Date(call.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <p className="sm:hidden">{new Date(call.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    <p className="hidden sm:block">{call.endTime ? new Date(call.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'null'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-900 text-center">No calls yet</p>
                    )
                }
            </div>
        </div>
    )
}