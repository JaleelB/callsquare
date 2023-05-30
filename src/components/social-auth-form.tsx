"use client"
import * as React from "react"
import { signIn } from "next-auth/react"
import { Icons } from './icons'

export default function SocialAuthForm (){

  const [isGithubSocialLoading, setIisGithubSocialLoading] = React.useState<boolean>(false)
  const [isGoogleSocialLoading, setIsGoogleSocialLoading] = React.useState<boolean>(false)
  const [isDiscordSocialLoading, setIsDiscordSocialLoading] = React.useState<boolean>(false)

  return (
    <section className='w-full mx-auto flex flex-col gap-1'>
        <button 
          className='w-full h-12 bg-slate-900 flex gap-3 text-sm text-white justify-center items-center rounded-sm'
          onClick={() => {
            setIisGithubSocialLoading(true)
            signIn("github")
          }}
          disabled={isGithubSocialLoading}
        >
            {isGithubSocialLoading ? (
              <Icons.spinner  width="16" height="16" color="white"/>
            ) : (
              <Icons.github color='white' width="16" height="16"/>
            )}
            Continue with Github
        </button>
        <button 
          className='w-full h-12 border-2 border-slate-200 text-sm text-slate-900 flex gap-3 justify-center items-center rounded-sm'
          onClick={() => {
            setIsGoogleSocialLoading(true)
            signIn("google")
          }}
          disabled={isGoogleSocialLoading}
        >
            {isGoogleSocialLoading ? (
              <Icons.spinner  width="16" height="16"/>
            ) : (
              <Icons.google color='#0f172a' width="16" height="16"/>
            )}
            Continue with Google
        </button>
        <button 
          className='w-full h-12 border-2 border-slate-200 text-slate-900 text-sm flex gap-3 justify-center items-center rounded-sm'
          onClick={() => {
            setIsDiscordSocialLoading(true)
            signIn("discord")
          }}
          disabled={isDiscordSocialLoading}
        >
            {isDiscordSocialLoading ? (
              <Icons.spinner  width="16" height="16"/>
            ) : (
              <Icons.discord color='#0f172a' width="16" height="16"/>
            )}
            Continue with Discord
        </button>
    </section>
  )
}


