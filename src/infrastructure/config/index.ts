import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key",
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/your-db-name",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
};
