import mongoose  from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONG_URL);
    console.log("Databse connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};


 
