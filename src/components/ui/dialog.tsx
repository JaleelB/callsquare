import React, { type ReactNode, type HTMLAttributes } from 'react';

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    open: ReactNode;
}

interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface DialogDescriptionProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
  

function Dialog ({ children, open, className = "", ...props }: DialogProps) {

  return (
    <div className={className} {...props}>
      {open && (
        <div
          role="dialog"
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className="flex justify-center items-center min-h-screen">
            <div 
                className="fixed inset-0 bg-white/80 backdrop-blur-sm z-100"
            ></div>
            <div
              className="bg-white z-100 rounded-lg text-left p-6 border border-slate-600/20 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DialogContent ({ children, className = "", ...props }: DialogContentProps) {
    return (
        <div 
            className={`${className}`} 
            {...props}
        >
            {children}
        </div>
    );
}

function DialogHeader ({ children, className = "", ...props }: DialogHeaderProps) {
    return (
        <h2 
            className={`text-2xl font-medium text-slate-900 ${className}`} 
            id="modal-title" 
            {...props}
        >
            {children}
        </h2>
        
    );
}

function DialogDescription ({ children, className = "", ...props }: DialogDescriptionProps) {
    return (
        <p 
            className={`text-sm text-slate-600 ${className}`} 
            {...props}
        >
            {children}
        </p>
        
    );
}

function DialogFooter ({ children, className = "", ...props }: DialogFooterProps) {
    return (
        <div 
            className={`mt-4 ${className}`} 
            {...props}
        >
            {children}
        </div>
    );
}

export { 
    Dialog, 
    DialogDescription, 
    DialogContent, 
    DialogHeader, 
    DialogFooter 
};
