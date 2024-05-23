import { type Metadata } from "next";
import Link from "next/link";
import { Icons } from "~/components/ui/icons";
import SocialAuthForm from "~/components/social-auth-form";

export const metadata: Metadata = {
  title: "CallSquare - Sign Up",
  description:
    "Create your CallSquare account today and start connecting with friends, family, and colleagues through seamless video calls.",
};

export default function RegisterPage() {
  return (
    <main className="mx-auto grid h-screen w-screen grid-cols-1 lg:grid-cols-2">
      <section
        className="hidden bg-slate-50 bg-cover bg-center bg-no-repeat lg:block"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/5198240/pexels-photo-5198240.jpeg)`,
        }}
      ></section>
      <section className="relative grid place-items-center sm:p-12">
        <div className="mx-auto flex w-[330px] flex-col gap-8 sm:w-[370px]">
          <div>
            <Link href="/">
              <Icons.camera height={49} width={60} className="-ml-3 mb-3" />
            </Link>
            <h1 className="mb-0.5 text-2xl font-medium tracking-tight">
              Let&apos;s get started
            </h1>
            <p className="text-muted-foreground">
              Create your Callsquare account
            </p>
          </div>
          <SocialAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              className="hover:text-brand underline underline-offset-4"
            >
              Already have an account? Sign In
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
