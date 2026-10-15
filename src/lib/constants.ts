export const APP_NAME = 'Atelier';
export const APP_TAGLINE = 'Museum-grade portfolio and commerce platform for contemporary creators';

export const STUDIO_NAV_ITEMS = [
  { label: 'Studio Overview', path: '/studio', icon: 'grid_view' },
  { label: 'Portfolio Customizer', path: '/studio/customize', icon: 'auto_stories' },
  { label: 'Profile Customizer', path: '/studio/profile', icon: 'person' },
  { label: 'Artworks', path: '/studio/artworks', icon: 'palette' },
  { label: 'Collections', path: '/studio/collections', icon: 'folder_special' },
  { label: 'Products & Editions', path: '/studio/products', icon: 'sell' },
  { label: 'Commissions', path: '/studio/commissions', icon: 'assignment', badge: '3 NEW' },
  { label: 'Orders', path: '/studio/orders', icon: 'receipt_long' },
  { label: 'Analytics', path: '/studio/analytics', icon: 'insights' },
  { label: 'Messages', path: '/studio/messages', icon: 'chat_bubble_outline' },
  { label: 'Settings', path: '/studio/settings', icon: 'tune' },
  { label: 'Upgrade Plan', path: '/studio/upgrade', icon: 'workspace_premium' },
] as const;

export const ARTWORK_CATEGORIES = [
  'Ceramics',
  'Sculpture',
  'Oil Painting',
  'Printmaking',
  'Textile & Fiber',
  'Photography',
  'Woodwork',
  'Mixed Media',
] as const;

export const ORDER_STATUSES = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
] as const;

export const COMMISSION_STATUSES = [
  'inquiry',
  'proposal_sent',
  'accepted',
  'in_progress',
  'completed',
  'declined',
] as const;
