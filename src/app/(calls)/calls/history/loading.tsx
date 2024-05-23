export default function CallHistoryLoading() {
  return (
    <div className="container mx-auto mb-12 max-w-[1400px]">
      <h1 className="mb-1 text-2xl font-semibold leading-tight md:text-[30px]">
        Call history
      </h1>
      <p className="mb-8 text-muted-foreground">
        Review your past interactions and revisit meaningful moments
      </p>

      <div className="rounded-md border p-4">
        <div className="mb-6 h-4 w-1/3 animate-pulse bg-primary"></div>
        <div className="my-2 h-4 w-full animate-pulse bg-primary"></div>
        <div className="my-2 h-4 w-full animate-pulse bg-primary"></div>
        <div className="mt-12 h-10 w-1/4 animate-pulse bg-primary"></div>
      </div>
    </div>
  );
}
