import { Router } from "express";
import { asyncHandler } from "../../utils";
import { loginRequired } from "../../passport/guards";
import UserService from "../../services/user";

export default (app: Router) => {
  const route = Router();

  // 유저 정보 조회
  route.get(
    "/",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      res.status(200).json({ isOk: true, user });
    })
  );

  // 유저 북마크 리스트 조회
  route.get(
    "/bookmark",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const userService = new UserService();
      const bookmarks = await userService.findAllBookmarks(user.id);
      res.status(200).json({ isOk: true, bookmarks });
    })
  );

  // 유저 닉네임 변경
  route.patch(
    "/",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const { nickname } = req.body;
      const userService = new UserService();
      await userService.updateUser(user.id, nickname);
      res.status(200).json({ isOk: true });
    })
  );

  // 회원 탈퇴
  route.delete(
    "/",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const userService = new UserService();
      await userService.withdrawUser(user.id);
      res.status(200).json({ isOk: true });
    })
  );

  // 유저 인증키 가져오기
  route.get(
    "/auth",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const userService = new UserService();
      const authKey = await userService.getUserAuthKey(user.id);
      res.status(200).json({ isOk: true, authKey });
    })
  );

  // 유저 깃랩 주소 입력 검증
  route.post(
    "/auth",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const { username } = req.body;
      const userService = new UserService();
      await userService.checkUserAuthKey(user.id, username);
      res.status(200).json({ isOk: true });
    })
  );

  app.use("/users", route);
};
