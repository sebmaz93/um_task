export class AppError extends Error {
  public readonly isOperational: boolean;

  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);

    this.name = this.constructor.name;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
