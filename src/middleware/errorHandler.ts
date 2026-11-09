import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../responses/responseHandler";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error"

    if (statusCode === 500) {
        console.log("Unexpected error:", err);
        sendResponse(res, statusCode, message)
        return;
    }


    console.log(message)
    sendResponse(res, statusCode, message)
};
