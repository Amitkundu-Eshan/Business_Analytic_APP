import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            default:null
          },
          category:{
            type: String,
            default:null
          },
          purchaseRate: {
            type: Number,
            default:null
          },
          selllingRate:{
            type: Number,
            default:null
          },
          enterpriseName:{
            type: String,
            default:null
          }
    },
    {
        timestamps: true,
    }
);

export const product = mongoose.model('product',productSchema);