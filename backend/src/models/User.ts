import mongoose from "mongoose";
import { IUserDocument } from "user";

export const UserSchema = new mongoose.Schema<IUserDocument>({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    default: 0,
  },
  track: {
    type: String,
  },
  gitlab: {
    type: String,
  },
});

const User = mongoose.model<IUserDocument>("User", UserSchema);

export { User };
