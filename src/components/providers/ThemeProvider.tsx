'use client';

import React, { createContext, useContext, useState } from 'react';

type Theme = 'monograph' | 'gallery' | 'editorial' | 'minimal';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'monograph',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('monograph');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={theme} className="w-full">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
