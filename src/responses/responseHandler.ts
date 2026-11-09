import { Request, Response } from "express";

export const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: unknown,
) => {
  return res.status(statusCode).json({
    status: statusCode < 400 ? "success" : "error",
    statusCode: statusCode,
    message,
    ...(data !== undefined && { data }),
  });
};