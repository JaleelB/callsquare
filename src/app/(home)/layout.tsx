import Link from "next/link";
import SiteFooter from "~/components/layout/footer";
import FullNav from "~/components/layout/full-nav";
import { Button } from "~/components/ui/button";

export default function HomePageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
        {/* @ts-expect-error Server Component */}
        <FullNav>
          <div className='flex gap-x-1.5'>
            <Link  href={"/login"}>
              <Button 
                className="mr-2 rounded-md font-normal hidden sm:block" 
                variant='ghost'
                size="sm"
              >
                Sign in
              </Button>
            </Link>
             <Link  href={"/register"}>
              <Button 
                className="rounded-md text-xs md:text-[12px] font-normal"
                size="sm"
              >
                Try Callsquare
                </Button>
              </Link>
          </div>
        </FullNav>
        <main className="flex-1 w-screen">
            {children}
        </main>
        <SiteFooter/>
    </div>
  );
}