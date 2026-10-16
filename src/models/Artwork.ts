/**
 * Artwork Model for MongoDB
 */

export interface IArtworkDocument {
  title: string;
  slug: string;
  creator: {
    id: unknown;
    name: string;
    username: string;
  };
  description: string;
  category: string;
  medium: string;
  year: number;
  dimensions: {
    height: number;
    width: number;
    depth?: number;
    unit: string;
  };
  price: number;
  currency: string;
  status: 'available' | 'reserved' | 'sold' | 'archived';
  images: Array<{
    url: string;
    publicId?: string;
    isPrimary?: boolean;
    caption?: string;
  }>;
  tags: string[];
  collectionId?: unknown;
  viewsCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const mockArtworkModel = {
  find: async () => [],
  findOne: async () => null,
  create: async (data: unknown) => ({ ...(data as Record<string, unknown>), _id: 'mock_art_id' }),
  deleteMany: async () => {},
};

export const Artwork = mockArtworkModel;
export default Artwork;
