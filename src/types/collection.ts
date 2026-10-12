import { Artwork } from './artwork';

export interface Collection {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  creator: {
    id: string;
    username: string;
  };
  artworks: string[] | Artwork[];
  coverImageUrl?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}
