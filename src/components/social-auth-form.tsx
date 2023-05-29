import React from 'react'
import { Icons } from './icons'

export default function SocialAuthForm (){
  return (
    <section className='w-full mx-auto flex flex-col gap-1'>
        <button className='w-full h-12 bg-slate-900 flex gap-3 text-white justify-center items-center rounded-sm'>
            <Icons.github color='white' width="16" height="16"/>
            Continue with Github
        </button>
        <button className='w-full h-12 border-2 border-slate-200 text-slate-900 flex gap-3 justify-center items-center rounded-sm'>
            <Icons.google color='#0f172a' width="16" height="16"/>
            Continue with Google
        </button>
        <button className='w-full h-12 border-2 border-slate-200 text-slate-900 flex gap-3 justify-center items-center rounded-sm'>
            <Icons.discord color='#0f172a' width="16" height="16"/>
            Continue with Discord
        </button>
    </section>
  )
}


