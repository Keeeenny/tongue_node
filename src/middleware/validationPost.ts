import { Request, Response, NextFunction } from "express";
import { checkString, checkNumber } from "./validationHelpers";
import { PostFields } from "../utils/types";

const POST_ALLOWED_FIELDS = [
  PostFields.ID,
  PostFields.USER_ID,
  PostFields.TITLE,
  PostFields.PUBLISHED_AT,
];

export const validateCreatePost = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.body.user_id || !req.body.title) {
    const err: any = new Error("All fields are required.");
    err.statusCode = 400;
    throw err;
  }

  validatePostFields(req.body, POST_ALLOWED_FIELDS);

  next();
};

export const validateDeletePost = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const id = req.params.id;
  checkNumber(id, PostFields.USER_ID);

  next();
};

function validatePostFields(
  bodyData: Record<string, unknown>,
  allowedFields: string[],
): void {
  if (
    !bodyData ||
    typeof bodyData !== "object" ||
    Object.keys(bodyData).length === 0
  ) {
    const err: any = new Error("Bad request: Request body is missing or empty");
    err.statusCode = 400;
    throw err;
  }

  const keys = Object.keys(bodyData);

  for (const property of keys) {
    if (!allowedFields.includes(property)) {
      const err: any = new Error(`Bad request: Invalid field '${property}'`);
      err.statusCode = 400;
      throw err;
    }

    if (property === PostFields.USER_ID) {
      checkNumber(bodyData[property], PostFields.USER_ID);
      console.log("User ID is valid");
    }
    if (property === PostFields.TITLE) {
      checkString(bodyData[property], PostFields.TITLE);
      console.log("Title is valid");
    }
  }
}
