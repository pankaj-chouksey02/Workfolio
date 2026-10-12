import React from 'react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  const borderColors = {
    success: 'border-l-emerald-600',
    error: 'border-l-red-600',
    info: 'border-l-[#C25E3E]',
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-[#E7E4DF] border-l-4 ${borderColors[type]} px-4 py-3 shadow-lg`}
    >
      <span className="font-sans text-xs text-[#141413]">{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-[#716E68] hover:text-[#141413] ml-2">
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      )}
    </div>
  );
}

export default Toast;
