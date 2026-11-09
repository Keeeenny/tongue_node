import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { UserFields, Id } from "../utils/types";
import { sendResponse } from "../responses/responseHandler";
import { toNumber } from "../utils/validators";
import { doUserExists } from "../utils/helpers";

export const getUsers = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  const users = await userRepository.getAll();

  return sendResponse(res, 200, "Users retrieved successfully", users);
};

export const createUser = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  const { nickname, age, city } = req.body;

  await isNicknameFree(nickname);

  const userId = await userRepository.create(nickname, age, city);

  if (!userId) {
    const err: any = new Error("Failed to create the user");
    err.statusCode = 500;
    throw err;
  }

  sendResponse(res, 201, "User created successfully", { id: userId });
  return;
};

export const patchUser = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  const bodyData = req.body;
  const id: Id = toNumber(req.params.id);
  const updates = [];
  const values = [];

  await doUserExists(id);

  for (const key in bodyData) {
    updates.push(`${key} = ?`);
    let value = bodyData[key];

    if (key == "nickname" || key == "city") {
      value = value.trim();
    }
    values.push(value);
  }

  const userId = await userRepository.patch(id, updates, values);

  if (!userId) {
    const err: any = new Error("Failed to update the user");
    err.statusCode = 500;
    throw err;
  }

  sendResponse(res, 200, "User updated successfully");
  return;
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  const id: Id = toNumber(req.params.id);

  await doUserExists(id);

  const isDeleted = await userRepository.delete(id);

  if (!isDeleted) {
    const err: any = new Error("Failed to delete the user");
    err.statusCode = 500;
    throw err;
  }

  sendResponse(res, 200, "User deleted successfully");
  return;
};

async function isNicknameFree(nickname: string): Promise<void> {
  const nameToCheck = await userRepository.findByField(
    UserFields.NICKNAME,
    nickname,
  );
  if (nameToCheck) {
    const err: any = new Error(`Nickname already taken`);
    err.statusCode = 409;
    throw err;
  }
}


