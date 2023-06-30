import { getCurrentUser } from "~/lib/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function CallLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: {
      slug: string
    }
}) {

  const user = await getCurrentUser();
  const unAuthorizedUserName = cookies().get("username");

  if (!user && !unAuthorizedUserName) {
    redirect(`/preview/${params.slug}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 w-screen flex items-center">
        {children}
      </main>
    </div>
  );
}