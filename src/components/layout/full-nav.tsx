import Link from "next/link";
import React from "react";
import { Icons } from "../ui/icons";
import { getCurrentUser } from "~/lib/session";

export default async function FullNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <header className="w-screen">
      <div className="container mx-auto flex h-20 max-w-[1400px] items-center justify-between py-6">
        <Link href={`${user ? "/calls" : "/"}`}>
          <Icons.logo width="150" height="30" className="-ml-3 text-primary" />
        </Link>
        <nav className="font-normal text-primary">{children}</nav>
      </div>
    </header>
  );
}
