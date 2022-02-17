import { JwtPayload, Jwt } from "jsonwebtoken";
import { Document, Model, PopulatedDoc } from "mongoose";

import { IPostDocument } from "post";

interface IGoogleUser {
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  photos: {
    value: string;
  }[];
}

export interface IUser {
  googleId: string;
  nickname: string;
  name: string;
  profile: string;
  provider: string;
  bookmarks: PopulatedDoc<IPostDocument>[];
  grade: number;
  hasNewNotification: boolean;
  authKey: string;
  hasNewNotifyings: boolean;
  track?: string;
  gitlab?: string;
  refreshToken?: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  findOrCreate: (
    googleId: string | Jwt | JwtPayload,
    user?: IGoogleUser
  ) => Promise<IUserDocument>;

  findOneByGoogleIdAndUpdateRefreshToken: (
    googleId: string,
    refreshToken: string
  ) => Promise<void>;

  findByGoogleId: ({ googleId: string }) => Promise<IUserDocument>;

  getRefreshTokenByGoogleId: ({
    googleId: string,
  }) => Promise<Partial<IUserDocument>>;

  updateUser: (userId: string, nickname: string) => Promise<void>;

  withdrawUser: (userId: string) => Promise<void>;

  addBookmark: (postId: string, userId: string) => Promise<void>;
  deleteBookmark: (postId: string, userId: string) => Promise<void>;

  findAllBookmarks: (userId: string) => Promise<IUserDocument>;

  getUserAuthKey: (userId: string) => Promise<string>;

  updateGrade: (userId: string) => Promise<void>;

  updateNotification: (
    userId: string,
    hasNewNotification: boolean
  ) => Promise<void>;
}
