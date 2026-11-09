import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket{
    id: number,
    nickname: string,
    age: number,
    city: string
}

export interface Post extends RowDataPacket{
    id: number,
    user_id: number,
    title: string,
    published_at: Date
}

export enum UserFields {
  ID = "id",
  NICKNAME = "nickname",
  CITY = "city",
  AGE = "age",
}


export enum PostFields {
  ID = "id",
  USER_ID = "user_id",
  TITLE = "title",
  PUBLISHED_AT = "published_at",
}
// export type Id = typeof NaN | number;
export type Id = number;