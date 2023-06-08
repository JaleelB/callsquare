import React, { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Input ({ label, className = "", ...props }: InputProps) {
    return (
        <div className="flex flex-col">
            {label && <label className="mb-2 text-gray-700">{label}</label>}
            <input 
                className={`border border-slate-300 bg-transparent font-normal px-3 py-2 text-sm h-12 rounded-md placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} 
                {...props} 
            />
        </div>
    );
}

