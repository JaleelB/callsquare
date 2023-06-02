import React from 'react';

interface BadgeProps {
  formattedDate: string;
}

export default function Badge({ formattedDate }: BadgeProps){
  return (
    <div className="inline-flex items-center px-2 py-1 bg-blue-500 text-white text-sm font-medium rounded-md">
      {formattedDate}
    </div>
  );
}
