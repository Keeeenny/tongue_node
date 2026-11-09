import { Request, Response, NextFunction } from "express";
import { toNumber } from "../utils/validators";
import { checkString, checkNumber } from "./validationHelpers";
import { UserFields } from "../utils/types";

const MIN_AGE = 16;
const MAX_AGE = 120;

const USER_ALLOWED_FIELDS = [
  UserFields.NICKNAME,
  UserFields.AGE,
  UserFields.CITY,
];

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.body.nickname || !req.body.age || !req.body.city) {
    const err: any = new Error("All fields are required.");
    err.statusCode = 400;
    throw err;
  }
  validateUserFields(req.body, USER_ALLOWED_FIELDS);
  checkAge(req.body.age);

  next();
};

export const validatePatchUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const bodyData = req.body;
  const id = req.params.id;

  checkNumber(id, UserFields.ID);
  validateUserFields(bodyData, USER_ALLOWED_FIELDS);
  if (req.body.age !== undefined) {
    checkAge(req.body.age);
  }

  next();
};

export const validateDeleteUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const id = req.params.id;
  checkNumber(id, UserFields.ID);

  next();
};

function checkAge(value: number): void {
  const age = toNumber(value);

  if (age < MIN_AGE || age > MAX_AGE) {
    const err: any = new Error(
      `Bad request: Age must be between ${MIN_AGE} and ${MAX_AGE}`,
    );
    err.statusCode = 400;
    throw err;
  }
}

function validateUserFields(
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

    if (property === UserFields.NICKNAME) {
      checkString(bodyData[property], UserFields.NICKNAME);
    }
    if (property === UserFields.AGE) {
      checkNumber(bodyData[property], UserFields.AGE);
    }
    if (property === UserFields.CITY) {
      checkString(bodyData[property], UserFields.CITY);
    }
  }
}
