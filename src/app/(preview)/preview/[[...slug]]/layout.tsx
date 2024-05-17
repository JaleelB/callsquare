import Link from "next/link";
import FullNav from "~/components/layout/full-nav";
import { Button } from "~/components/ui/button";

export default function CallPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="fixed z-40">
        <FullNav>
          <Link href={"/login"}>
            <Button
              className="rounded-md px-5 text-xs font-normal md:text-sm"
              size="sm"
              variant="secondary"
            >
              Sign in
            </Button>
          </Link>
        </FullNav>
      </div>
      <main className="flex min-h-screen w-screen items-center">
        {children}
      </main>
    </div>
  );
}
