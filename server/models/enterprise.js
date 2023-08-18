import mongoose from 'mongoose';

import bcrypt from 'bcryptjs';

const enterpriseSchema = new mongoose.Schema(
  {
    enterpriseName: {
      type: String,
      require:true,
      unique:true
    },
    token:{
        type:String,
        default:null
    },
    profilePic: {
      type: String,
    },
    customers:{
        type:Array
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    phone: {
      type: Number,
      default:null
    },
    password: {
      type: String,
      required:true
    },
    address: {
      type: String,
      default:null
    }
},
  {
    timestamps: true,
  }
);

enterpriseSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

enterpriseSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const enterprise = mongoose.model('enterprise', enterpriseSchema);
