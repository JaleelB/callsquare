"use client"
import React, { type ReactNode, useEffect, useState } from 'react';
import Toast from './ui/toast';
import ToastContext, { type ToastValues, type ToastVariant } from '../context/toast-context';

interface ToastData {
  id: number;
  title?: string;
  message: string;
  variant: ToastVariant;
}

interface ToastProviderProps {
  children: ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps){
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const duration = 5000;

  const addToast = (values: ToastValues) => {
    const id = Date.now();
    const variant = values.variant || 'default';
    setToasts(toasts => [...toasts, { id, variant, ...values }]);
  };

  const removeToast = (id: number) => {
    setToasts(toasts => toasts.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    if (toasts.length === 0) return;
  
    const currentToast = toasts[0];
    if (currentToast) {
      const timer = setTimeout(() => {
        removeToast(currentToast.id);
      }, duration);
  
      return () => clearTimeout(timer);
    }
  }, [toasts]);
  

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            id={toast.id}
            message={toast.message} 
            duration={duration}
            variant={toast.variant}
            removeToast={removeToast}
            title={toast.title}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
