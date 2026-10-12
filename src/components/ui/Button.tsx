import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  loading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-sans uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#141413] text-white hover:bg-[#C25E3E] shadow-sm',
    secondary: 'bg-[#FAF8F5] text-[#141413] border border-[#E7E4DF] hover:bg-[#eae8e5]',
    outline: 'border border-[#141413] text-[#141413] hover:bg-[#141413] hover:text-white',
    ghost: 'text-[#56423d] hover:text-[#141413] hover:bg-[#FAF8F5]',
    danger: 'bg-red-700 text-white hover:bg-red-800 shadow-sm',
  };

  const sizes = {
    sm: 'text-[11px] px-3 py-1.5 gap-1.5',
    md: 'text-xs px-5 py-2.5 gap-2',
    lg: 'text-sm px-6 py-3.5 gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
      ) : icon ? (
        <span className="material-symbols-outlined text-[16px]">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}

export default Button;
