import mongoose from "mongoose";
import { IGoogleUser, IUserDocument, IUserModel } from "user";

export const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    googleId: {
      type: String,
      required: true,
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
    bookmarks: {
      type: [mongoose.Types.ObjectId],
      ref: "Post",
      default: [],
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
    refreshToken: {
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

UserSchema.statics.findOneByGoogleIdAndUpdateRefreshToken = async (
  googleId,
  refreshToken
) => {
  await User.findOneAndUpdate(
    { googleId },
    {
      refreshToken,
    }
  );
};

UserSchema.statics.findByGoogleId = async ({ googleId }) => {
  const user = User.findOne({ googleId });
  return user.select("-bookmarks -refreshToken");
};

UserSchema.statics.getRefreshTokenByGoogleId = async ({ googleId }) => {
  const user = User.findOne({ googleId });
  return user.select("refreshToken");
};

UserSchema.statics.updateBookmark = async (postId: string, userId: string) => {
  const user = await User.findById(userId);
  if (user.bookmarks.length > 0 && user.bookmarks.includes(postId)) {
    await User.findByIdAndUpdate(userId, {
      $pull: { bookmarks: postId },
    });
    return;
  }
  await User.findByIdAndUpdate(userId, {
    $push: { bookmarks: postId },
  });
};

UserSchema.statics.findAllBookmarks = async (userId: string) => {
  const bookmarks = await User.findById(userId)
    .select("bookmarks")
    .populate("bookmarks");
  return bookmarks;
};

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);

export { User };
