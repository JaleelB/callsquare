import Link from "next/link";
import FullNav from "~/components/full-nav";
import { Button } from "~/components/ui/button";

export default function CallPreviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {

  return (
    <div>
      <div className="fixed z-40">
        {/* @ts-expect-error Server Component */}
        <FullNav>
          <Link  href={"/login"}>
            <Button 
              className="rounded-md text-xs md:text-sm px-5 font-normal"
              size="sm"
              variant="secondary"
            >
              Sign in
            </Button>
          </Link>
        </FullNav>
      </div>
      <main className="flex items-center w-screen min-h-screen">
        {children}
      </main>
    </div>
  );
}