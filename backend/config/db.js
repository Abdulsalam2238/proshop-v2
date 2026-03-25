import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URI:", process.env.MONGO_URI); // Debug to check env

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;