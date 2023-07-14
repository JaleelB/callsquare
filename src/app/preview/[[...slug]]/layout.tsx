import Link from "next/link";
import FullNav from "~/components/full-nav";
import Button from "~/components/old-ui/button";
import { Icons } from "~/components/old-ui/icons";

export default function CallPreviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {

  return (
    <div>
      <div className="absolute">
        <FullNav>
            <Button className="rounded-md">
              <Link href={'/'} className="flex items-center">
                Invite
                <Icons.invite className="ml-2" width={20} height={20} color="#fff" />
              </Link> 
            </Button>
        </FullNav>
      </div>
      <main className="w-screen h-screen fixed">
          {children}
      </main>
    </div>
  );
}