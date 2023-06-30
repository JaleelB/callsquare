export default function HistoryLayout({
    children
}: {
    children: React.ReactNode
}) {

  return (
    <section className="flex min-h-full flex-col flex-1 self-start w-screen -mt-3 sm:-mt-10 md:py-14 lg:py-20">
        {children}
    </section>
  );
}