/**
 * Order Model for MongoDB
 */

export interface IOrderDocument {
  orderNumber: string;
  buyer: {
    name: string;
    email: string;
    shippingAddress?: string;
  };
  items: Array<{
    artworkId?: any;
    title: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  currency: string;
  status: string;
  trackingNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

let OrderModel: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mongoose = require('mongoose');
  const OrderSchema = new mongoose.Schema(
    {
      orderNumber: { type: String, required: true, unique: true },
      buyer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        shippingAddress: { type: String },
      },
      items: [
        {
          artworkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' },
          title: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, default: 1 },
        },
      ],
      totalAmount: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
      status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
      },
      trackingNumber: { type: String },
    },
    { timestamps: true }
  );

  OrderModel = mongoose.models.Order || mongoose.model('Order', OrderSchema);
} catch (e) {
  OrderModel = {
    find: async () => [],
    findOne: async () => null,
    create: async (data: any) => ({ ...data, _id: 'mock_order_id' }),
  };
}

export const Order = OrderModel;
export default Order;
