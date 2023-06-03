import SiteFooter from "~/components/footer";
import FullNav from "~/components/full-nav";
import UserAccountDropdown from "~/components/user-account-dropdown";
import { getCurrentUser } from "~/lib/session";

export default async function HomePageLayout({
    children,
}: {
    children: React.ReactNode;
}) {

  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <FullNav>
        <UserAccountDropdown user={{ 
            name: user?.name || '', 
            email: user?.email || '',
            image: user?.image || '' 
          }} 
        />
      </FullNav>
      <main className="flex-1 w-screen flex items-center">
          {children}
      </main>
      <SiteFooter/>
    </div>
  );
}