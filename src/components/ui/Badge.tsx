import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-[#141413] text-white',
    accent: 'bg-[#C25E3E] text-white',
    success: 'bg-emerald-800 text-white',
    outline: 'border border-[#E7E4DF] text-[#716E68] bg-white',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
