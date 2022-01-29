import { Router } from "express";
import {
  checkPermission,
  checkCommentPermission,
  loginRequired,
} from "../middlewares";
import {
  findAllPosts,
  findPostById,
  createPost,
  updatePost,
  deletePost,
} from "../../services/post";
import CommentService from "../../services/comment";
import { Post, Comment } from "../../models";
import { asyncHandler } from "../../utils";

export default (app: Router) => {
  const route = Router();

  // 익명/일반 글 목록 조회
  route.get(
    "/",
    asyncHandler(async (req, res) => {
      const subject = String(req.query.subject);
      const category = String(req.query.category);
      const currentPage = Number(req.query.currentPage) || 1;
      const [posts, pagination] = await findAllPosts(
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

  // 익명/일반 글 상세 조회
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

  // 익명/일반 글 작성
  route.post(
    "/",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const { title, contents, subject, category, area, tags } = req.body;
      const postId = await createPost(
        user,
        { title, contents, subject },
        { category, area, tags }
      );
      res.status(201).json({ isOk: true, postId });
    })
  );

  // 익명/일반 글 수정
  route.put(
    "/:postId",
    loginRequired,
    checkPermission,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const { title, contents, subject, category, area, tags } = req.body;
      await updatePost(
        postId,
        { title, contents, subject },
        { category, area, tags }
      );
      res.status(200).json({ isOk: true, postId });
    })
  );

  // 익명/일반 글 삭제
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

  // 댓글 작성
  route.post(
    "/:postId/comments",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const { postId } = req.params;
      const { contents } = req.body;
      const commentService = new CommentService(Post, Comment, postId);
      const commentId = await commentService.createComment(user, contents);
      res.status(201).json({ isOk: true, commentId });
    })
  );

  // 댓글 목록
  route.get(
    "/:postId/comments",
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const currentPage = Number(req.query.currentPage) || 1;
      const commentService = new CommentService(Post, Comment, postId);
      const [comments, pagination] = await commentService.findAllComments(
        currentPage
      );
      res.status(200).json({ isOk: true, comments, pagination });
    })
  );

  // 댓글 수정
  route.put(
    "/:postId/comments",
    loginRequired,
    checkCommentPermission,
    asyncHandler(async (req, res) => {
      const { contents, commentId } = req.body;
      const commentService = new CommentService(Post, Comment);
      await commentService.updateComment(commentId, contents);
      res.status(200).json({ isOk: true, commentId });
    })
  );

  // 댓글 삭제
  route.delete(
    "/:postId/comments",
    loginRequired,
    checkCommentPermission,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const { commentId } = req.body;
      const commentService = new CommentService(Post, Comment, postId);
      await commentService.deleteComment(commentId);
      res.status(200).json({ isOk: true, commentId });
    })
  );

  app.use("/posts", route);
};
