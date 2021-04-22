import { NextFunction, Request, Response } from "express";

export const get404 = (req: Request, resp: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  resp.status(404);
  next(error);
  console.log(error);
};

export const handleError = (
  err: Error,
  _req: Request,
  resp: Response,
  _next: NextFunction
) => {
  const statusCode = resp.statusCode === 200 ? 500 : resp.statusCode;
  resp.status(statusCode);
  resp.json({
    message: err.message,
    success: false,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
