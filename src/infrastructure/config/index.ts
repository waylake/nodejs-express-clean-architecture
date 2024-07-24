import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  dbUrl: process.env.DB_URL || "mongodb://localhost:27017/your-db-name",
};
