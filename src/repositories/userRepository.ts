import dbPool from "../database/connection";
import { BaseRepository } from "./baseRepository";
import { User } from "../utils/types";

class UserRepository extends BaseRepository<User> {
  protected tableName = "users";

  async create(
    nickname: string,
    age: number,
    city: string,
  ): Promise<number | boolean> {
    const sql = `INSERT INTO ${this.tableName} (nickname, age, city) VALUES (?, ?, ?)`;
    const [result]: any = await dbPool.execute(sql, [nickname, age, city]);

    if (result.affectedRows === 0) return false;
    return result.insertId;
  }

  async patch(
    id: any,
    fieldsToUpdate: Array<string>,
    values: Array<any>
  ): Promise<boolean> {
    const sql = `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
    const [result]: any = await dbPool.execute(sql, [
      ...values,
      id,
    ]);    


    return result.affectedRows > 0;
  }
}

export const userRepository = new UserRepository();
