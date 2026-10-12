export type UserRole = 'artist' | 'collector' | 'admin';

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  discipline?: string;
  location?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  acceptingCommissions: boolean;
  socials?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  customization?: {
    theme?: 'monograph' | 'gallery' | 'editorial' | 'minimal';
    fontPrimary?: string;
    accentColor?: string;
  };
  createdAt: string;
  updatedAt: string;
}
