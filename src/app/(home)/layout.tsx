import Link from "next/link";
import SiteFooter from "~/components/footer";
import FullNav from "~/components/full-nav";
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
          <div className='hidden sm:flex'>
            <Button className="mr-2 rounded-md font-normal" variant='ghost'>
              <Link  href={"/login"}>
                Sign in
              </Link>
            </Button> 
            <Button className="rounded-md font-normal">
              <Link  href={"/register"}>
                Get Started
              </Link>
            </Button> 
          </div>
          <div className='flex sm:hidden'>
            <Button className="mr-2 rounded-md font-normal" variant='ghost' size="sm">
              <Link  href={"/login"}>
                Sign in
              </Link>
            </Button> 
            <Button className="rounded-md font-normal" size="sm">
              <Link  href={"/register"}>
                Get Started
              </Link>
            </Button> 
          </div>
        </FullNav>
        <main className="flex-1 w-screen">
            {children}
        </main>
        <SiteFooter/>
    </div>
  );
}