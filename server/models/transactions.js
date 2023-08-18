import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        billNo: {
            type: Number,
            default:null
          },
          amount: {
            type: Number,
            default:null
          },
          mode:{
            type: Number,
            default:null
          },
    },
    {
        timestamps: true,
    }
);

export const transactions = mongoose.model('transactions', transactionSchema);