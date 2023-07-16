import Link from 'next/link';
import React from 'react'
import { Icons } from './ui/icons';
import { getCurrentUser } from '~/lib/session';

export default async function FullNav({children}: {children: React.ReactNode}) {

  const user = await getCurrentUser()

  return (
    <header className='w-screen'> 
      <div className='container max-w-[1400px] mx-auto flex justify-between items-center h-20 py-6'>
        <Link href={`${user ? '/calls' : '/'}`}>
          <Icons.logo width="150" height="30"/>
        </Link>
        <nav className='text-neutral-700 font-normal'>
          {children}
        </nav>
      </div>
    </header>
  );
}
