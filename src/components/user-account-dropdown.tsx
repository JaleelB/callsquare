import React, { useState } from 'react';
import UserAvatar from './ui/user-avatar';
import { signOut } from 'next-auth/react';
import ToastContext from '~/context/toast-context';

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
            <button onClick={toggleDropdown}>
                <UserAvatar image={user.image}/>
            </button>
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10"
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
                                    callbackUrl: `${window.location.origin}/login`,
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
