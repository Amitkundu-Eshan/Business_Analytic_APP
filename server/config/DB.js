import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      //useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log('database connected');
  } catch (error) {
    console.error('database connection error');
    process.exit(1);
  }
};

export default connectDB;