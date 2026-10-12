import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  bordered?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  bordered = true,
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };

  return (
    <div
      className={`bg-white ${bordered ? 'border border-[#E7E4DF]' : ''} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
