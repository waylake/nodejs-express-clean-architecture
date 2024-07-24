import swaggerJsdoc from "swagger-jsdoc";
import { version } from "../../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version,
      description: "A sample API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/infrastructure/swagger/definitions/*.yaml"],
};

export const swaggerSpec = swaggerJsdoc(options);
