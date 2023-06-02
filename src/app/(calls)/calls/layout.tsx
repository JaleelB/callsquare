import SiteFooter from "~/components/footer";
import FullNav from "~/components/full-nav";

export default function HomePageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
        <FullNav/>
        <main className="flex-1 w-screen">
            {children}
        </main>
        <SiteFooter/>
    </div>
  );
}