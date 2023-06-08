import React from 'react';

type ButtonVariant = 'default' | 'destructive' | 'secondary' | 'transparent';
type ButtonSize = 'default' | 'sm' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

export default function Button({
    variant = 'default',
    size = 'default',
    className = '',
    children,
    ...props
}: ButtonProps) {
    const baseClasses = 'inline-flex items-center justify-center text-sm transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none';

    const variantClasses: Record<ButtonVariant, string> = {
        default: 'bg-slate-900 border border-slate-900 hover:bg-slate-900/90 text-white',
        destructive: 'bg-red-500 border border-red-500 hover:bg-red-500/90 text-white',
        secondary: 'border border-slate-200 text-slate-900 hover:bg-slate-100/90 text-slate-900',
        transparent: 'text-slate-900 hover:bg-slate-200/90 text-slate-900',
    };

    const sizeClasses: Record<ButtonSize, string> = {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-12 px-8',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
