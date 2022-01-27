import jwt, { SignOptions, VerifyCallback } from "jsonwebtoken";
import { IUserDocument } from "user";
import configs from "../../config";

const { jwtSecret } = configs;

export const createToken = (user: IUserDocument) => {
  const payload = { googleId: user.googleId };
  const signOpts: SignOptions = {
    expiresIn: "7d",
  };
  const token = jwt.sign(payload, jwtSecret, signOpts);
  return token;
};

export const verifyToken = (token: string, cb: VerifyCallback) =>
  jwt.verify(token, jwtSecret, cb);
