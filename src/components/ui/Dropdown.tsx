'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface DropdownOption {
  label: string;
  value: string;
  icon?: string;
}

export interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function Dropdown({
  label = 'Select',
  options,
  selectedValue,
  onSelect,
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === selectedValue);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between w-full px-3 py-2 bg-[#FAF8F5] border border-[#E7E4DF] text-xs font-mono text-[#141413] hover:border-[#141413] transition-colors cursor-pointer"
      >
        <span>{selectedOption ? selectedOption.label : label}</span>
        <span className="material-symbols-outlined text-[16px] text-[#716E68] ml-2">expand_more</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-full min-w-[160px] bg-white border border-[#E7E4DF] shadow-lg z-50 py-1">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                selectedValue === option.value
                  ? 'bg-[#141413] text-white font-semibold'
                  : 'text-[#141413] hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="flex items-center gap-2">
                {option.icon && <span className="material-symbols-outlined text-[14px]">{option.icon}</span>}
                <span>{option.label}</span>
              </div>
              {selectedValue === option.value && (
                <span className="material-symbols-outlined text-[14px]">check</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
