import { createClient } from "redis";
import config from "../config";
import logger from "../logging/logger";

const redisClient = createClient({
  url: config.redisUrl,
});

redisClient.on("error", (err) => logger.error("Redis Client Error", err));
redisClient.on("connect", () => logger.info("Redis connected successfully"));

export const connectRedis = async (): Promise<void> => {
  await redisClient.connect();
};

export { redisClient };
