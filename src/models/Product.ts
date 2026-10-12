/**
 * Product & Edition Model for MongoDB
 */

export interface IProductDocument {
  artworkId?: any;
  title: string;
  slug: string;
  type: string;
  editionTotal?: number;
  editionRemaining?: number;
  price: number;
  currency: string;
  stock: number;
  imageUrl: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

let ProductModel: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mongoose = require('mongoose');
  const ProductSchema = new mongoose.Schema(
    {
      artworkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' },
      title: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      type: {
        type: String,
        enum: ['original', 'limited_edition_print', 'merchandise', 'publication'],
        default: 'limited_edition_print',
      },
      editionTotal: { type: Number },
      editionRemaining: { type: Number },
      price: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
      stock: { type: Number, default: 1 },
      imageUrl: { type: String, required: true },
      status: {
        type: String,
        enum: ['active', 'draft', 'sold_out'],
        default: 'active',
      },
    },
    { timestamps: true }
  );

  ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);
} catch (e) {
  ProductModel = {
    find: async () => [],
    findOne: async () => null,
    create: async (data: any) => ({ ...data, _id: 'mock_prod_id' }),
  };
}

export const Product = ProductModel;
export default Product;
