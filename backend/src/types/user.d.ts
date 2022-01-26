import { Document } from "mongoose";

export interface IUser {
  googleId: string;
  nickname: string;
  name: string;
  profile: string;
  provider: string;
  grade: number;
  track?: string;
  gitlab?: string;
}

export interface IUserDocument extends IUser, Document {}
