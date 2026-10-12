import React from 'react';
import Button from '../ui/Button';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = 'inventory_2',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-[#E7E4DF]">
      <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E7E4DF] flex items-center justify-center text-[#716E68] mb-4">
        <span className="material-symbols-outlined text-[24px]">{icon}</span>
      </div>
      <h3 className="font-serif text-lg text-[#141413] mb-1">{title}</h3>
      <p className="font-sans text-xs text-[#716E68] max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
