import mongoose from "mongoose";
import logger from "../utils/logger";

export const ConnectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection failed", { error });
    process.exit(1);
  }
};
