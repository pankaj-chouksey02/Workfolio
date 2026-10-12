export interface ArtworkImage {
  url: string;
  publicId?: string;
  isPrimary?: boolean;
  caption?: string;
  width?: number;
  height?: number;
}

export interface ArtworkDimensions {
  height: number;
  width: number;
  depth?: number;
  unit: 'cm' | 'in';
}

export type ArtworkStatus = 'available' | 'reserved' | 'sold' | 'archived';

export interface Artwork {
  _id: string;
  title: string;
  slug: string;
  creator: {
    id: string;
    name: string;
    username: string;
  };
  description: string;
  category: string;
  medium: string;
  year: number;
  dimensions: ArtworkDimensions;
  price: number;
  currency: string;
  status: ArtworkStatus;
  images: ArtworkImage[];
  tags: string[];
  collectionId?: string;
  viewsCount?: number;
  createdAt: string;
  updatedAt: string;
}
