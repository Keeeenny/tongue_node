import { sendResponse } from "../responses/responseHandler";
import { Request, Response } from "express";
import { postRepository } from "../repositories/postRepository";
import { Id } from "../utils/types";
import { toNumber } from "../utils/validators";
import { doPostExists } from "../utils/helpers";

export const getPost = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  const posts = await postRepository.getAll();

  return sendResponse(res, 200, "Posts retrived successfully", posts);
};

export const createPost = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  console.log("Controller Called");
  const { user_id, title } = req.body;
  const postId = await postRepository.create(user_id, title);

  if (!postId) {
    const err: any = new Error("Failed to create the post");
    err.statusCode = 500;
    throw err;
  }

  sendResponse(res, 201, "Posts retrived successfully", { id: postId });
  return;
};

export const deletePost = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  const id: Id = toNumber(req.params.id);

  await doPostExists(id);

  const isDeleted = await postRepository.delete(id);

  if (!isDeleted) {
    const err: any = new Error("Failed to delete the post");
    err.statusCode = 500;
    throw err;
  }

  sendResponse(res, 200, "Post deleted successfully");
  return;
};
