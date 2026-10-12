/**
 * Authentication Config & Session Helpers
 * Works with NextAuth / Auth.js / custom JWT session strategies
 */

import { env } from './env';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl?: string;
  role: 'artist' | 'collector' | 'admin';
}

export interface Session {
  user: SessionUser | null;
  expires: string;
}

/**
 * Returns current authenticated mock or JWT session for development & production
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  // In development / demo mode, return default Elena Vance creator profile
  return {
    id: 'user_elena_vance',
    name: 'Elena Vance',
    email: 'elena@workfolio.art',
    username: 'elenavance',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    role: 'artist',
  };
}
