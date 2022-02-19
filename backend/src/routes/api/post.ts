import { Router } from "express";
import PostService from "../../services/post";

import { asyncHandler, purifyHtml } from "../../utils";
import { loginRequired, loginCheck } from "../../passport/guards";
import { checkPermission, checkGatherPost, checkGrade } from "../middlewares";

import commentRouter from "./comment";
import replyRouter from "./reply";
import config from "../../config";

export default (app: Router) => {
  const route = Router();

  route.use("/:postId/comments", commentRouter);
  route.use("/:postId/replies", replyRouter);

  // 글 목록 조회
  route.get(
    "/",
    loginCheck,
    asyncHandler(async (req, res) => {
      const subject = String(req.query.subject);
      const category = String(req.query.category);
      const currentPage = Number(req.query.page) || 1;
      const perPage = Number(req.query.perPage) || config.perPage;
      const postService = new PostService();
      const [posts, pagination] = await postService.findAllPosts(
        subject,
        category,
        currentPage,
        perPage
      );
      const { user } = req;
      const hasNewNotification = user ? user.hasNewNotification : false;
      res.status(200).json({
        isOk: true,
        posts,
        pagination,
        hasNewNotification,
      });
    })
  );

  // 글 상세 조회
  route.get(
    "/:postId",
    loginCheck,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const userId = user ? user.id : undefined;
      const { postId } = req.params;
      const postService = new PostService();
      const post = await postService.findPostById(postId, userId);
      const hasNewNotification = user ? user.hasNewNotification : false;
      res.status(200).json({
        isOk: true,
        post,
        hasNewNotification,
      });
    })
  );

  // 글 작성
  route.post(
    "/",
    loginRequired,
    checkGrade,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const { title, contents, excerpt, subject, category, area, tags, icon } =
        req.body;
      const postService = new PostService();
      const postId = await postService.createPost(
        user,
        { title, contents: purifyHtml(contents), excerpt, subject },
        { category, area, tags, icon }
      );
      res.status(201).json({ isOk: true, postId });
    })
  );

  // 글 수정
  route.put(
    "/:postId",
    loginRequired,
    checkGrade,
    checkPermission,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const { title, contents, excerpt, subject, category, area, tags, icon } =
        req.body;
      const postService = new PostService();
      await postService.updatePost(
        postId,
        { title, contents: purifyHtml(contents), excerpt, subject },
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
      const postService = new PostService();
      await postService.deletePost(postId);
      res.status(200).json({ isOk: true, postId });
    })
  );

  // 모집 글 완료처리
  route.patch(
    "/:postId",
    loginRequired,
    checkPermission,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const postService = new PostService();
      await postService.completePost(postId);
      res.status(200).json({ isOk: true });
    })
  );

  // 모집 글 신청자 수락
  route.post(
    "/:postId/cast",
    loginRequired,
    checkGatherPost,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const { userId } = req.body;
      const postServcie = new PostService();
      await postServcie.addAppliedUser(postId, userId);
      res.status(200).json({ isOk: true });
    })
  );

  // 모집 글 신청자 취소
  route.delete(
    "/:postId/cast",
    loginRequired,
    checkGatherPost,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const { userId } = req.body;
      const postServcie = new PostService();
      await postServcie.removeAppliedUser(postId, userId);
      res.status(200).json({ isOk: true });
    })
  );

  // 좋아요
  route.post(
    "/:postId/like",
    loginRequired,
    checkGrade,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const { postId } = req.params;
      const postService = new PostService();
      await postService.addLike(postId, user.id);
      res.status(200).json({ isOk: true });
    })
  );

  route.delete(
    "/:postId/like",
    loginRequired,
    checkGrade,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const { postId } = req.params;
      const postService = new PostService();
      await postService.deleteLike(postId, user.id);
      res.status(200).json({ isOk: true });
    })
  );

  // 북마크
  route.post(
    "/:postId/bookmark",
    loginRequired,
    checkGrade,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const { user } = req;
      const postService = new PostService();
      await postService.addBookmark(postId, user.id);
      res.status(200).json({ isOk: true });
    })
  );

  route.delete(
    "/:postId/bookmark",
    loginRequired,
    checkGrade,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const { user } = req;
      const postService = new PostService();
      await postService.deleteBookmark(postId, user.id);
      res.status(200).json({ isOk: true });
    })
  );

  app.use("/posts", route);
};
