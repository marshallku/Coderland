import { sign } from "jsonwebtoken";
import { IUserModel, IUserDocument } from "user";
import config from "../config";

export default class AuthService {
  UserModel: IUserModel;

  constructor(UserModel: IUserModel) {
    this.UserModel = UserModel;
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
