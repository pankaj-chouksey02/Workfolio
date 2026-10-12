/**
 * Commission Model for MongoDB
 */

export interface ICommissionDocument {
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  description: string;
  budgetRange: string;
  deadline?: Date;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

let CommissionModel: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mongoose = require('mongoose');
  const CommissionSchema = new mongoose.Schema(
    {
      clientName: { type: String, required: true },
      clientEmail: { type: String, required: true },
      projectTitle: { type: String, required: true },
      description: { type: String, required: true },
      budgetRange: { type: String, default: 'Negotiable' },
      deadline: { type: Date },
      status: {
        type: String,
        enum: ['inquiry', 'proposal_sent', 'accepted', 'in_progress', 'completed', 'declined'],
        default: 'inquiry',
      },
    },
    { timestamps: true }
  );

  CommissionModel = mongoose.models.Commission || mongoose.model('Commission', CommissionSchema);
} catch (e) {
  CommissionModel = {
    find: async () => [],
    findOne: async () => null,
    create: async (data: any) => ({ ...data, _id: 'mock_comm_id' }),
  };
}

export const Commission = CommissionModel;
export default Commission;
