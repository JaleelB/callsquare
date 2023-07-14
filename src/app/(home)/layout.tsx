import Link from "next/link";
import SiteFooter from "~/components/footer";
import FullNav from "~/components/full-nav";
import Button from "~/components/old-ui/button";

export default function HomePageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
        <FullNav>
          <div className='flex'>
            <Button className="hidden sm:block mr-2 rounded-md" variant='transparent'>
              <Link  href={"/login"}>
                Sign in
              </Link>
            </Button> 
            <Button className="rounded-md">
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