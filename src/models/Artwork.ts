/**
 * Artwork Model for MongoDB
 */

export interface IArtworkDocument {
  title: string;
  slug: string;
  creator: {
    id: any;
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
  collectionId?: any;
  viewsCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

let ArtworkModel: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mongoose = require('mongoose');
  const ArtworkSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      slug: { type: String, required: true, unique: true, index: true },
      creator: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        username: { type: String, required: true, index: true },
      },
      description: { type: String, default: '' },
      category: { type: String, required: true, index: true },
      medium: { type: String, required: true },
      year: { type: Number, required: true },
      dimensions: {
        height: { type: Number, required: true },
        width: { type: Number, required: true },
        depth: { type: Number },
        unit: { type: String, default: 'cm' },
      },
      price: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
      status: {
        type: String,
        enum: ['available', 'reserved', 'sold', 'archived'],
        default: 'available',
      },
      images: [
        {
          url: { type: String, required: true },
          publicId: { type: String },
          isPrimary: { type: Boolean, default: false },
          caption: { type: String },
        },
      ],
      tags: [{ type: String }],
      collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' },
      viewsCount: { type: Number, default: 0 },
    },
    { timestamps: true }
  );

  ArtworkModel = mongoose.models.Artwork || mongoose.model('Artwork', ArtworkSchema);
} catch (e) {
  ArtworkModel = {
    find: async () => [],
    findOne: async () => null,
    create: async (data: any) => ({ ...data, _id: 'mock_art_id' }),
    deleteMany: async () => {},
  };
}

export const Artwork = ArtworkModel;
export default Artwork;
