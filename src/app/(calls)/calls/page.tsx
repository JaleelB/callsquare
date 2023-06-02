import Badge from "~/components/ui/badge";
import { formatDate } from "~/lib/date";

export default function CallsPage(){
    return (
        <section className="container max-w-[1400px] space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 mx-auto">
            <div className="flex flex-col items-center gap-4 text-center">
                <div>
                    <Badge date={formatDate(new Date())}/>
                    <h1 className="mt-4 text-4xl text-slate-900 md:text-6xl font-bold leading-tight">
                        Welcome to Callsquare
                    </h1>
                </div>
            </div>
        </section>
    )
}