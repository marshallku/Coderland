import { JwtPayload, Jwt } from "jsonwebtoken";
import { Document, Model } from "mongoose";

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
  grade: number;
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
}
