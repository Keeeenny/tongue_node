import dbPool from "../database/connection";
import { BaseRepository } from "./baseRepository";
import { Post } from "../utils/types";

class PostRepository extends BaseRepository<Post> {
  protected tableName = "posts";

  async create(user_id: number, title: string): Promise<number | boolean> {
    console.log("repository called");
    const sql = `INSERT INTO ${this.tableName} (user_id, title) VALUES (?, ?)`;
    const [result]: any = await dbPool.execute(sql, [user_id, title]);

    if (result.affectedRows === 0) return false;
    return result.insertId;
  }
}

export const postRepository = new PostRepository();
