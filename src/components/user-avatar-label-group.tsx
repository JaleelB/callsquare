import React from 'react';
import UserAvatar from './user-avatar';

interface User {
  name: string;
  email: string;
  image: string;
}

interface UserAvatarLabelGroupProps {
  user: User;
}

export default function UserAvatarLabelGroup({ user }: UserAvatarLabelGroupProps) {
  return (
    <div className="flex items-center">
      <UserAvatar image={user.image} />
      <div className="hidden sm:block ml-3 text-left">
        <div className="text-sm font-semibold">{user.name}</div>
        <div className="text-xs text-muted-foreground">{user.email}</div>
      </div>
    </div>
  );
}
