import app from "./app";
import config from "../config";
import { connectDB } from "../database/mongodb";
import { connectRedis } from "../cache/redis";
import logger from "../logging/logger";

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
