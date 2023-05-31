import Link from 'next/link';
import React from 'react'
import { Icons } from './icons';
import Button from './ui/button';

export default function FullNav() {
  return (
    <header className='w-screen z-40 px-4 md:px-8'>
        <nav 
          className='
            w-full max-w-[1400px] text-neutral-700
            flex justify-between items-center h-20 py-6
            font-normal mx-auto
          '
        >
            <Link href={'/'}>
              <Icons.logo width="150" height="30"/>
            </Link>

            <Button className="rounded-full">
              <Link  href={"/login"}>
                Get Started
              </Link>
            </Button>
        </nav>
    </header>
  );
}
