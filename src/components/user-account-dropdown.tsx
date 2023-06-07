"use client"
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import ToastContext from '~/context/toast-context';
import UserAvatarLabelGroup from './user-avatar-label-group';

interface User {
  name: string;
  email: string;
  image: string;
}

interface DropdownProps {
  user: User;
}

export default function UserAccountDropdown({ user }: DropdownProps) {
    const { addToast } = React.useContext(ToastContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button onClick={toggleDropdown} className='flex gap-2'>
                <UserAvatarLabelGroup user={user}/>
            </button>
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10 border border-slate-200"
                >
                    <div>
                        <div className='flex flex-col px-4 py-2 border-b border-slate-200'>
                            <div className="block text-slate-900 font-medium">
                                {user.name}
                            </div>
                            <div className="block text-sm text-gray-700">
                                {user.email}
                            </div>
                        </div>
                        
                        <div
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={(event) => {
                                event.preventDefault()
                                signOut({
                                    callbackUrl: `${window.location.origin}/`,
                                })
                                .catch((error) => {
                                    console.error('Error signing out:', error);
                                    addToast({
                                        title: 'Error signing out',
                                        message: 'Please try again.',
                                        variant: 'destructive'
                                    })
                                });
                            }}
                        >
                            Sign out
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
