import { sign } from "jsonwebtoken";
import { IUserModel, IUserDocument } from "user";
import { User } from "../models";
import config from "../config";

export default class AuthService {
  private UserModel: IUserModel;

  constructor() {
    this.UserModel = User;
  }

  async login(user: IUserDocument) {
    const accessToken = sign({ googleId: user.googleId }, config.jwtSecret, {
      expiresIn: "7d",
    });
    const refreshToken = sign({}, config.jwtSecret, { expiresIn: "14d" });

    await this.UserModel.findOneByGoogleIdAndUpdateRefreshToken(
      user.googleId,
      refreshToken
    );

    return [accessToken, refreshToken];
  }
}
