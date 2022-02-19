import mongoose from "mongoose";
import { v4 } from "uuid";
import { IGoogleUser, IUserDocument, IUserModel } from "user";
import { PushSubscription } from "web-push";

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
    hasNewNotification: {
      type: Boolean,
      default: false,
    },
    authKey: {
      type: String,
      default: () => v4(),
    },
    subscriptions: {
      type: [],
      default: [],
    },
    track: {
      type: String,
    },
    github: {
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

/**
 * 구글 로그인 시 유저 조회 후 유저 정보 전달, 혹은 생성 후 전달
 * @param decoded 토큰 디코딩 결과
 * @param user 구글에서 받아온 유저 정보
 * @returns 이미 가입된 유저라면 유저정보, 아니라면 저장 후 유저정보
 */
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
    profile: user.photos[0].value,
  });

  return newUser;
};

/**
 * 유저 구글 ID로 리프레시 토큰 업데이트
 * 유저 로그인 시 유저의 리프레시 토큰 발급(2주)
 * @param googleId 유저 구글 ID
 * @param refreshToken 유저 리프레시 토큰
 */
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

/**
 * 구글 ID로 유저 정보 조회
 * 토큰 디코딩 결과로 유저 정보 가져올 때 사용합니다.
 * @param param0 구글 ID
 * @returns 유저 정보
 */
UserSchema.statics.findByGoogleId = async ({ googleId }) => {
  const user = await User.findOne({ googleId }).select(
    "-bookmarks -refreshToken -authKey"
  );
  return user;
};

/**
 * 액세스 토큰 만료 시 구글 ID로 유저를 조회해
 * 리프레시 토큰의 만료 여부를 확인하기 위한 함수
 * @param param0 구글 ID
 * @returns 리프레시 토큰
 */
UserSchema.statics.getRefreshTokenByGoogleId = async ({ googleId }) => {
  const user = await User.findOne({ googleId }).select("refreshToken");
  return user;
};

/**
 * 유저가 북마크한 포스트를 유저 정보에 저장합니다.
 * @param postId 유저 북마크한 포스트 ID
 * @param userId 유저 ID
 * @returns void
 */
UserSchema.statics.addBookmark = async (postId: string, userId: string) => {
  const user = await User.findById(userId);
  if (user.bookmarks.includes(postId)) {
    return;
  }
  await User.findByIdAndUpdate(userId, {
    $push: { bookmarks: postId },
  });
};

UserSchema.statics.deleteBookmark = async (postId: string, userId: string) => {
  const user = await User.findById(userId);
  if (!user.bookmarks.includes(postId)) {
    return;
  }
  await User.findByIdAndUpdate(userId, {
    $pull: { bookmarks: postId },
  });
};

/**
 * 유저가 설정한 북마크 전체 리스트를 조회
 * @param userId 유저 ID
 * @returns 북마크 리스트
 */
UserSchema.statics.findAllBookmarks = async (userId: string) => {
  const bookmarks = await User.findById(userId)
    .select("bookmarks")
    .populate("bookmarks");
  return bookmarks;
};

/**
 * 유저 정보를 수정 (닉네임)
 * @param userId 유저 ID
 * @param nickname 유저가 변경할 닉네임
 */
UserSchema.statics.updateUser = async (
  userId: string,
  userDto: Partial<IUserDocument>
) => {
  // 전달되지 않은 undefined 제거 후 수정
  await User.findByIdAndUpdate(userId, {
    ...userDto,
  });
};

/**
 * 유저 정보를 삭제 합니다.
 * 유저가 생성한 글, 댓글, 답글 모두 삭제하지 않고,
 * 사라진 체셔 고양이라는 이름으로 대체 됩니다.
 *
 * 재가입 시 새로운 ID를 발급합니다.
 * @param userId 유저 ID
 */
UserSchema.statics.withdrawUser = async (userId: string) => {
  await User.findByIdAndUpdate(userId, {
    googleId: "withdrawal",
    nickname: "사라진 체셔 고양이",
    grade: -1,
    profile: "Not access",
    provider: "Not access",
    track: "Not access",
    github: "Not access",
    refreshToken: "Not access",
  });
};

/**
 * 레이서 인증을 위해 생성된 인증키를 발급
 * @param userId 유저 ID
 * @returns 유저 개인 인증 키
 */
UserSchema.statics.getUserAuthKey = async (userId: string) => {
  const { authKey } = await User.findById(userId).select("authKey");
  return authKey;
};

/**
 * 인증이 완료된 레이서의 등급을 설정
 * @param userId 유저 ID
 */
UserSchema.statics.updateGrade = async (userId: string) => {
  await User.findByIdAndUpdate(userId, {
    grade: 1,
    authKey: "already auth",
  });
};

/**
 * 새로운 알림 등록
 */
UserSchema.statics.updateNotification = async (
  userId: string,
  hasNewNotification: boolean
) => {
  await User.findByIdAndUpdate(userId, {
    hasNewNotification,
  });
};

/**
 * 유저 푸시 알림 전송 정보 추가
 * @param userId 유저 정보
 * @param subscription 푸시 알림 엔드포인트
 */
UserSchema.statics.pushSubscription = async (
  userId: string,
  subscription: PushSubscription
) => {
  await User.findByIdAndUpdate(userId, {
    $push: { subscriptions: subscription },
  });
};

/**
 * 유저 푸시 알림 전송 정보 제거
 * @param userId 유저 정보
 * @param subscription 푸시 알림 엔드포인트
 */
UserSchema.statics.pullSubscription = async (
  userId: string,
  endpoint: string
) => {
  await User.findByIdAndUpdate(userId, {
    $pull: { subscriptions: { endpoint } },
  });
};

UserSchema.statics.findAllSubscriptions = async (userId: string) => {
  const user = await User.findById(userId).select("subscriptions");
  return user.subscriptions;
};

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);

export { User };
