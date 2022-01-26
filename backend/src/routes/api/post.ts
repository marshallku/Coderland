import { Router } from "express";
import checkPermission from "../../utils/check-permission";
import {
  findPostById,
  createPost,
  updatePost,
  deletePost,
} from "../../services/post";
import asyncHandler from "../../utils/async-handler";
import loginRequired from "../middlewares/login-required";

export default (app: Router) => {
  const route = Router();

  route.get(
    "/:postId",
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const post = await findPostById(postId);
      res.status(200).json({
        isOk: true,
        post,
      });
    })
  );

  route.post(
    "/",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const { title, contents, subject } = req.body;
      const postId = await createPost(user, { title, contents, subject });
      res.status(201).json({ isOk: true, postId });
    })
  );

  route.put(
    "/:postId",
    loginRequired,
    checkPermission,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const { title, contents } = req.body;
      await updatePost(postId, { title, contents });
      res.status(200).json({ isOk: true, postId });
    })
  );

  route.delete(
    "/:postId",
    loginRequired,
    checkPermission,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      await deletePost(postId);
      res.status(200).json({ isOk: true, postId });
    })
  );

  app.use("/posts", route);
};
