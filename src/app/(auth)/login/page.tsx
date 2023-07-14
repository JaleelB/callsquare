import { type Metadata } from "next"
import Link from "next/link"
import { Icons } from "~/components/ui/icons"
import SocialAuthForm from "~/components/social-auth-form"

export const metadata: Metadata = {
  title: "CallSquare - Connect with Ease",
  description: "Sign in to CallSquare and start connecting with your friends, family, and colleagues through seamless video calls.",
}

export default function LoginPage() {
  return (
    <main className="w-screen h-screen grid grid-cols-1 lg:grid-cols-2 mx-auto">
      <section className="grid place-items-center p-12 relative">
          <div className="mx-auto -mt-16 flex flex-col justify-center gap-8 w-[330px] sm:w-[370px]">
            <div>
              <Link href="/">
                <Icons.camera height={49} width={60} className="-ml-3 mb-3"/>
              </Link>
              <h1 className="text-2xl font-medium tracking-tight mb-0.5">Connect with Callsquare</h1>
              <p className="text-slate-600 text-sm">Welcome back! Sign in to your Callsquare account</p>
            </div>
          <SocialAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground text-slate-600">
            <Link
              href="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </section>
      <section 
        className="bg-slate-50 bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{ backgroundImage: `url(https://images.pexels.com/photos/4492135/pexels-photo-4492135.jpeg)` }}
      >
      </section>
    </main>
  )
}