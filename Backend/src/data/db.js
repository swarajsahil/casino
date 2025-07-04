import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (process.env.NODE_ENV !== "production") {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (error) {
   if (process.env.NODE_ENV !== "production") {
      console.error(`Error: ${error.message}`);
    }
    process.exit(1);
  }
};

export default connectDB;