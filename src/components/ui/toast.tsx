import React, { useEffect, useState } from 'react';
import { type ToastVariant } from '~/context/toast-context';
import { Icons } from './icons';

interface ToastProps {
    id: number;
    title?: string;
    message: string;
    variant?: ToastVariant;
    duration: number;
    removeToast: (id: number) => void;
}

export default function Toast ({ id, title, message, variant, removeToast, duration }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration || 3000);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const bgColor = variant === 'destructive' ? 'bg-red-500' : 'bg-slate-900';

  return (
    <div className={`fixed w-max bottom-4 md:bottom-8 ${bgColor} right-0 md:right-4 mt-4 mr-4 text-white text-sm py-3 px-6 rounded-md cursor-pointer`}>
        <Icons.close
            width={17} 
            height={17} 
            color={'white'} 
            className='absolute right-4'
            onClick={() => removeToast(id)}
        />
        <div className='mr-8'>
            {title && <h3 className='font-semibold mb-0.5'>{title}</h3>}
            <p className='opacity-90'>{message}</p>
        </div>
        
    </div>
  );
}
