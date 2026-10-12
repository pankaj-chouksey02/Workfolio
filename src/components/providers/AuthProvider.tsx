'use client';

import React, { createContext, useContext, useState } from 'react';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  handle: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const mockDefaultUser: UserSession = {
  id: 'usr-elena-vance-01',
  name: 'Elena Vance',
  email: 'elena@atelier.art',
  handle: 'elenavance',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
};

const AuthContext = createContext<AuthContextType>({
  user: mockDefaultUser,
  isAuthenticated: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(mockDefaultUser);

  const login = (email: string) => {
    setUser({
      ...mockDefaultUser,
      email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
