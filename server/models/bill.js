import mongoose from 'mongoose';

const billSchema = new mongoose.Schema(
    {
        billAmount: {
            type: Number,
            default:0
          },
          deposite: {
            type: Number,
            default:null
          },
          pending:{
            type: Number,
            default:null
          },
          productPuschased:
              [{
                id:{
                  type:String,
                },
                quantity:{
                  type:String,
                }
              }]        
    },
    {
        timestamps: true,
    }
);

export const bill = mongoose.model('bill', billSchema);