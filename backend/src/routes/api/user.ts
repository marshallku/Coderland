import { Router } from "express";
import { asyncHandler } from "../../utils";
import { loginRequired } from "../../passport/guards";
import UserService from "../../services/user";

export default (app: Router) => {
  const route = Router();

  route.get(
    "/",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      res.status(200).json({ isOk: true, user });
    })
  );

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

  app.use("/users", route);
};
