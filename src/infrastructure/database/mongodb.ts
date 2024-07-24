import mongoose from "mongoose";
import config from "../config";
import logger from "../logging/logger";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info("MongoDB connected successfully");

    // 데이터베이스 생성 확인
    const db = mongoose.connection.db;
    logger.info(`Connected to database: ${db.databaseName}`);

    // 컬렉션 목록 출력
    const collections = await db.listCollections().toArray();
    logger.info(
      "Collections:",
      collections.map((c) => c.name),
    );
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
