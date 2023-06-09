import React, { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helper?: string;
}

export default function Input ({ label, className = "", helper, ...props }: InputProps) {
    return (
        <div className="flex flex-col w-full">
            {label && <label className="mb-1 text-slate-700">{label}</label>}
            <input 
                className={`border w-full border-slate-300 bg-transparent font-normal px-3 py-2 text-sm h-11 rounded-md placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50 ${className}`} 
                {...props} 
            />
            {helper && <p className="text-slate-400 text-sm">{helper}</p>}
        </div>
    );
}

