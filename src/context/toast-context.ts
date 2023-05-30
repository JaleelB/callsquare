// ToastContext.tsx
import React from 'react';

export type ToastVariant = 'default' | 'destructive';

export interface ToastValues {
  title?: string;
  message: string;
  variant?: ToastVariant;
}

interface ToastContextData {
  addToast: (values: ToastValues) => void;
  removeToast: (id: number) => void;
}

const defaultContextData: ToastContextData = {
  addToast: () => {
    throw new Error('addToast function must be overridden');
  },
  removeToast: () => {
    throw new Error('removeToast function must be overridden');
  },
};

const ToastContext = React.createContext<ToastContextData>(defaultContextData);

export default ToastContext;
