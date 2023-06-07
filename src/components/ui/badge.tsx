import React from 'react';

interface BadgeProps {
  date: string;
}

export default function Badge({ date }: BadgeProps){
  return (
    <div className="inline-flex items-center rounded-full px-3 py-1.5 bg-slate-900/5 border border-slate-900/10 text-slate-900/50 text-sm cursor-pointer">
      {date}
    </div>
  );
}
