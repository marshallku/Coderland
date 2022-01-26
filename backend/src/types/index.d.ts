import { IUserDocument } from "user";

declare global {
  namespace Express {
    export interface User extends IUserDocument {}
  }
}
