import { type Metadata } from "next"
import Link from "next/link"
import { Icons } from "~/components/old-ui/icons"
import SocialAuthForm from "~/components/social-auth-form"

export const metadata: Metadata = {
  title: "CallSquare - Sign Up",
  description: "Create your CallSquare account today and start connecting with friends, family, and colleagues through seamless video calls.",
}

export default function RegisterPage() {
  return (
    <main className="w-screen h-screen grid grid-cols-1 lg:grid-cols-2 mx-auto">
      <section 
        className="bg-slate-50 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{ backgroundImage: `url(https://images.pexels.com/photos/5198240/pexels-photo-5198240.jpeg)` }}
      >
      </section>
      <section className="grid place-items-center sm:p-12 relative">
        <div className="mx-auto flex flex-col gap-8 w-[330px] sm:w-[370px]">
          <div>
            <Link href="/">
              <Icons.camera height={49} width={60} className="-ml-3 mb-3"/>
            </Link>
            <h1 className="text-2xl font-medium tracking-tight mb-0.5">Let&apos;s get started</h1>
            <p className="text-slate-600">Create your Callsquare account</p>
          </div>
          <SocialAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground text-slate-600">
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
  )
}