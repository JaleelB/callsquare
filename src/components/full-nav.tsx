"use client";
import Link from 'next/link';
import React from 'react'
import { Icons } from './icons';
import Button from './ui/button';
import { useSession } from 'next-auth/react';
import UserAccountDropdown from './user-account-dropdown';

export default function FullNav() {

  const { data: sessionData } = useSession();

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

            {!sessionData?.user ? (
              <Button className="rounded-full">
                <Link  href={"/login"}>
                  Get Started
                </Link>
              </Button> 
              )
              : <UserAccountDropdown user={{ 
                ...sessionData?.user, 
                name: sessionData?.user?.name || '', 
                email: sessionData?.user?.email || '',
                image: sessionData?.user?.image || '' 
              }} />
            }
        </nav>
    </header>
  );
}
