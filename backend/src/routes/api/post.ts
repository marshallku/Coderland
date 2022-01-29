import { Router } from "express";
import PostService from "../../services/post";
import { Post } from "../../models";

import { asyncHandler } from "../../utils";
import { checkPermission, loginRequired } from "../middlewares";

import commentRouter from "./comment";

export default (app: Router) => {
  const route = Router();

  route.use("/:postId/comments", commentRouter);

  // 글 목록 조회
  route.get(
    "/",
    asyncHandler(async (req, res) => {
      const subject = String(req.query.subject);
      const category = String(req.query.category);
      const currentPage = Number(req.query.currentPage) || 1;
      const postService = new PostService(Post);
      const [posts, pagination] = await postService.findAllPosts(
        subject,
        category,
        currentPage
      );
      res.status(200).json({
        isOk: true,
        posts,
        pagination,
      });
    })
  );

  // 글 상세 조회
  route.get(
    "/:postId",
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const postService = new PostService(Post);
      const post = await postService.findPostById(postId);
      res.status(200).json({
        isOk: true,
        post,
      });
    })
  );

  // 글 작성
  route.post(
    "/",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const { title, contents, subject, category, area, tags, icon } = req.body;
      const postService = new PostService(Post);
      const postId = await postService.createPost(
        user,
        { title, contents, subject },
        { category, area, tags, icon }
      );
      res.status(201).json({ isOk: true, postId });
    })
  );

  // 글 수정
  route.put(
    "/:postId",
    loginRequired,
    checkPermission,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const { title, contents, subject, category, area, tags, icon } = req.body;
      const postService = new PostService(Post);
      await postService.updatePost(
        postId,
        { title, contents, subject },
        { category, area, tags, icon }
      );
      res.status(200).json({ isOk: true, postId });
    })
  );

  // 글 삭제
  route.delete(
    "/:postId",
    loginRequired,
    checkPermission,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const postService = new PostService(Post);
      await postService.deletePost(postId);
      res.status(200).json({ isOk: true, postId });
    })
  );

  route.patch(
    "/:postId",
    loginRequired,
    checkPermission,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const postService = new PostService(Post);
      await postService.completePost(postId);
      res.status(200).json({ isOk: true });
    })
  );

  app.use("/posts", route);
};
