import React, { type ChangeEvent } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export default function Checkbox ({ checked, onChange, label, className="", disabled }: CheckboxProps) {
  return (
    <label className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`form-checkbox h-4 w-4 border-slate-900 accent-slate-900`}
      />
      {label && <span className="text-gray-900 text-sm ">{label}</span>}
    </label>
  );
}
