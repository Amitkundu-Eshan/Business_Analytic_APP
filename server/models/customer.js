import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            default:null
          },
          enterpriseName: {
            type: String,
            default:null
          },
        email: {
            type: String,
            required: true,
            unique: true,
          },
          location: {
            type: String,
            default:null
          },
          contactNo: {
            type: Number,
            default:null
          },
          billNo:{
            type: Array,
            default:[]
          },
    },
    {
        timestamps: true,
    }
);

export const customer = mongoose.model('customer', customerSchema);