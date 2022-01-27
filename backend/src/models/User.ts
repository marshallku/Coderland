import mongoose from "mongoose";
import { IGoogleUser, IUserDocument, IUserModel } from "user";

export const UserSchema = new mongoose.Schema<IUserDocument>(
  {
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
  },
  {
    versionKey: false,
  }
);

UserSchema.statics.findOrCreate = async (
  decoded: { googleId: string },
  user?: IGoogleUser
) => {
  const googleUser = await User.findOne(decoded);
  if (googleUser) {
    return googleUser;
  }

  const newUser = await User.create({
    googleId: decoded.googleId,
    nickname: user.displayName,
    name: `${user.name.familyName} ${user.name.givenName}`,
    profile: user.photos[0].value,
  });
  return newUser;
};

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);

export { User };
