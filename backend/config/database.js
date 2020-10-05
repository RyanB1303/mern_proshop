import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(
      `MongoDB Connected : ${conn.connection.host}`.bgGreen.black.underline
    );
  } catch (error) {
    console.error(`Error : ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
