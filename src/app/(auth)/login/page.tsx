import { type Metadata } from "next"
import Link from "next/link"
import { Icons } from "~/components/icons"
import SocialAuthForm from "~/components/social-auth-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <main className="container flex h-screen w-screen mx-auto flex-col items-center justify-center">
      <div className="mx-auto flex flex-col justify-center gap-8 w-[330px] sm:w-[370px] ">
          <div className="w-full flex justify-center -mb-9">
            <Icons.camera height={100} width={70}/>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            Log in to CallSquare
          </h1>
        <SocialAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </main>
  )
}