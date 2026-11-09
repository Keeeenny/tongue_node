import { postRepository } from "../repositories/postRepository";
import { userRepository } from "../repositories/userRepository";

export async function doUserExists(id: number): Promise<void> {
  const user = await userRepository.findById(id);
  if (!user) {
    const err: any = new Error(`User does not exists.`);
    err.statusCode = 404;
    throw err;
  }
}

 export async function doPostExists(id: number): Promise<void> {
  const post = await postRepository.findById(id);
  if (!post) {
    const err: any = new Error(`Post does not exists.`);
    err.statusCode = 404;
    throw err;
  }
}