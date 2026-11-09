import { Id } from "./types";


export const isString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0;
};


export const toNumber = (value: unknown): number => {
  const parseNumber = Number(value)

  if (!Number.isInteger(parseNumber) || parseNumber <= 0){
    return NaN;
  }

  return parseNumber
};

