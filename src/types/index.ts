export * from './user';
export * from './artwork';
export * from './collection';

export interface Product {
  _id: string;
  artworkId?: string;
  title: string;
  slug: string;
  type: 'original' | 'limited_edition_print' | 'merchandise' | 'publication';
  editionTotal?: number;
  editionRemaining?: number;
  price: number;
  currency: string;
  stock: number;
  imageUrl: string;
  status: 'active' | 'draft' | 'sold_out';
}

export interface Order {
  _id: string;
  orderNumber: string;
  buyer: {
    name: string;
    email: string;
    shippingAddress?: string;
  };
  items: Array<{
    artworkId?: string;
    title: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  createdAt: string;
}

export interface Commission {
  _id: string;
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  description: string;
  budgetRange: string;
  deadline?: string;
  status: 'inquiry' | 'proposal_sent' | 'accepted' | 'in_progress' | 'completed' | 'declined';
  createdAt: string;
}
