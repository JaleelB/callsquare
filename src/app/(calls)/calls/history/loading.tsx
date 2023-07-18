export default function CallHistoryLoading() {
    return (
        <div className="container max-w-[1400px] mb-12 mx-auto">
            <h1 className="text-2xl md:text-[30px] font-semibold leading-tight mb-1">Call history</h1>
            <p className="text-muted-foreground mb-8">Review your past interactions and revisit meaningful moments</p>
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-500">Loading...</p>
            </div>
        </div>
    )
}