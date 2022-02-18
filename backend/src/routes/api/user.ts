import { Router } from "express";
import { asyncHandler } from "../../utils";
import { loginRequired } from "../../passport/guards";
import UserService from "../../services/user";
import NotificationService from "../../services/notification";

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
      const currentPage = Number(req.query.page) || 1;
      const userService = new UserService();
      const [bookmarks, pagination] = await userService.findAllBookmarks(
        user.id,
        currentPage
      );
      res.status(200).json({ isOk: true, bookmarks, pagination });
    })
  );

  // 유저 닉네임, 트랙, 깃헙주소 변경
  route.patch(
    "/",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const { nickname, track, github } = req.body;
      const userService = new UserService();
      await userService.updateUser(user.id, { nickname, track, github });
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

  // 유저 알림 리스트 조회
  route.get(
    "/notification",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const notificationService = new NotificationService();
      const notification = await notificationService.findAllNotification(
        user.id
      );
      res.status(200).json({ isOk: true, notification });
    })
  );

  app.use("/users", route);
};
