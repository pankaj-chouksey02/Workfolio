import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, className = '', id, ...props }: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="font-mono text-[10px] uppercase tracking-wider text-[#716E68]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-3 py-2.5 bg-white border border-[#E7E4DF] text-xs font-sans text-[#141413] placeholder-[#A09D96] focus:outline-none focus:border-[#141413] transition-colors ${
          error ? 'border-red-600 focus:border-red-600' : ''
        } ${className}`}
        {...props}
      />
      {error && <span className="text-[11px] text-red-600">{error}</span>}
      {helperText && !error && <span className="text-[11px] text-[#716E68]">{helperText}</span>}
    </div>
  );
}

export default Input;
