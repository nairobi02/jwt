import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const CONNECTION_URL = process.env.CONNECTION_URL;
const connectToDB = async () => {
  if (!CONNECTION_URL) throw new Error("couldn't connect to database");
  await mongoose.connect(CONNECTION_URL);
};
export default connectToDB;
