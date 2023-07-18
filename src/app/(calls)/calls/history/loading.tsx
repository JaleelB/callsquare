export default function CallHistoryLoading() {
    return (
        <div className="container max-w-[1400px] mb-12 mx-auto">
            <h1 className="text-2xl md:text-[30px] font-semibold leading-tight mb-1">Call history</h1>
            <p className="text-muted-foreground mb-8">Review your past interactions and revisit meaningful moments</p>
            
            <div className="rounded-md border p-4">
                <div className="h-4 bg-slate-100 animate-pulse w-1/3 mb-6"></div>
                <div className="h-4 bg-slate-100 animate-pulse w-full my-2"></div>
                <div className="h-4 bg-slate-100 animate-pulse w-full my-2"></div>
                <div className="h-10 bg-slate-100 animate-pulse w-1/4 mt-12"></div>
            </div>
        </div>
    )
}