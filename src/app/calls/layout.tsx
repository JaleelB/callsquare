import SiteFooter from "~/components/footer";
import FullNav from "~/components/full-nav";
import UserAccountDropdown from "~/components/user-account-dropdown";
import { getCurrentUser } from "~/lib/session";
import { notFound } from "next/navigation"
import CallIdProvider from "~/context/call-id-context";

export default async function CallsHomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {

  const user = await getCurrentUser()

  if (!user) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <FullNav>
        <UserAccountDropdown 
          user={{ 
            name: user?.name || '', 
            email: user?.email || '',
            image: user?.image || '' 
          }} 
        />
      </FullNav>
      <main className="flex-1 w-screen my-16 md:my-8 flex items-center">
        <CallIdProvider>
          {children}
        </CallIdProvider>
      </main>
      <SiteFooter/>
    </div>
  );
}