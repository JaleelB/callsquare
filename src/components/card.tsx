import React from 'react';

interface CardComponentProps {
    children?: React.ReactNode;
    className?: string;
}

interface CardDescriptionProps extends CardComponentProps {
  children: string;
}

interface CardTitleProps extends CardComponentProps {
  children: string;
}
  

function CardContainer({ children, className = '' }: CardComponentProps){
  return (
    <div className={`rounded-2xl bg-neutral-100 border-2 border-zinc-100 p-2 ${className}`}>
        <div className='bg-white w-full h-full rounded-xl p-6 shadow-md flex flex-col justify-between'>
            {children}
        </div>
    </div>
  );
}

function CardHeader ({ children, className = '' }: CardComponentProps) {
  return <div className={`${className}`}>{children}</div>;
}

function CardTitle ({ children, className = '' }: CardTitleProps){
  return <h2 className={`text-left font-semibold text-slate-900 ${className}`}>{children}</h2>;
}

function CardContent ({ children, className = '' }: CardComponentProps) {
  return <div className={`${className}`}>{children}</div>;
}

function CardDescription ({ children, className = '' }: CardDescriptionProps) {
  return <p className={`text-left text-slate-600 text-[14px] ${className}`}>{children}</p>;
}


export {
    CardTitle,
    CardContent,
    CardDescription,
    CardHeader,
    CardContainer
}