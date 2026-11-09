import { isString, toNumber } from "../utils/validators";

export function checkString(value: unknown, field: string): void {
  const isStringValid: boolean = isString(value);
  if (!isStringValid) {
    const err: any = new Error(
      `Bad request: ${field} is not a string or is empty`,
    );
    err.statusCode = 400;
    throw err;
  }
}

export function checkNumber(value: unknown, field: string): void {
  const isNumbeValid: boolean = !isNaN(toNumber(value));

  if (!isNumbeValid) {
    const err: any = new Error(
      `Bad request: ${field} is not a valid positive integer`,
    );
    err.statusCode = 400;
    throw err;
  }
}