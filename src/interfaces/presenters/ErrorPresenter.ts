import { injectable } from "inversify";
import { CustomError } from "../../domain/errors/CustomError";

interface ErrorResponse {
  error: string;
  statusCode: number;
}

@injectable()
export class ErrorPresenter {
  present(error: Error | CustomError): ErrorResponse {
    if (error instanceof CustomError) {
      return {
        error: error.message,
        statusCode: error.statusCode,
      };
    }

    return {
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}
