import React from 'react';
import { Icons } from './ui/icons';
import Image from 'next/image';

interface UserAvatarProps {
  image?: string;
}

export default function UserAvatar ({ image }: UserAvatarProps) {
    
  return (
    <div className={`h-8 w-8 md:h-10 md:w-10 relative cursor-pointer rounded-full overflow-hidden bg-gray-200 flex items-center justify-center`}>
      {image ? (
        <Image 
            src={image} 
            alt="User Avatar" 
            className="object-cover"
            width={40}
            height={40}
        />
      ) : (
        <Icons.avatar height={20} width={20}/>
     )} 
    </div>
  );
}
