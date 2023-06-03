import Link from 'next/link';
import React from 'react'
import { Icons } from './ui/icons';

export default function FullNav({children}: {children: React.ReactNode}) {

  return (
    <header className='w-screen z-40 px-4 md:px-8'> 
      <div className='w-full max-w-[1400px] mx-auto flex justify-between items-center h-20 py-6'>
        <Link href={'/'}>
          <Icons.logo width="150" height="30"/>
        </Link>
        <nav className='text-neutral-700 font-normal'>
          {children}
        </nav>
      </div>
    </header>
  );
}
