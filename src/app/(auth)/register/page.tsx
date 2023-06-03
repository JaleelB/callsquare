import { type Metadata } from "next"
import Link from "next/link"
import { Icons } from "~/components/ui/icons"
import SocialAuthForm from "~/components/social-auth-form"
import Button from "~/components/ui/button"

export const metadata: Metadata = {
  title: "CallSquare - Sign Up",
  description: "Create your CallSquare account today and start connecting with friends, family, and colleagues through seamless video calls.",
}

export default function RegisterPage() {
  return (
    <main className="container flex h-screen w-screen mx-auto flex-col items-center justify-center">
      <Button variant="transparent" className="absolute top-4 left-4 md:left-8">
        <Link href="/" >
          <span className="flex">
            <Icons.chevronLeft className="mr-2" width={16} height={16} />
            Go back
          </span>
        </Link>
      </Button>
      <div className="mx-auto -mt-16 flex flex-col justify-center gap-8 w-[330px] sm:w-[370px] ">
          <div className="w-full flex justify-center -mb-9">
            <Icons.camera height={100} width={70}/>
          </div>
          <h1 className="text-2xl font-medium tracking-tight text-center">
            Create your Callsquare account
          </h1>
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
    </main>
  )
}