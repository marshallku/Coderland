import { Router } from "express";
import { asyncHandler } from "../../utils";
import CommentService from "../../services/comment";
import { Post, Comment } from "../../models";
import { loginRequired, loginCheck } from "../../passport/guards";
import { checkCommentPermission, checkGrade } from "../middlewares";

const commentRouter = Router({ mergeParams: true });

// 댓글 작성
commentRouter.post(
  "/",
  loginRequired,
  checkGrade,
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
commentRouter.get(
  "/",
  loginCheck,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { postId } = req.params;
    const userId = user ? user.id : undefined;
    const currentPage = Number(req.query.currentPage) || 1;
    const commentService = new CommentService(Post, Comment, postId);
    const [comments, pagination] = await commentService.findAllComments(
      currentPage,
      userId
    );
    res.status(200).json({ isOk: true, comments, pagination });
  })
);

// 댓글 수정
commentRouter.put(
  "/",
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
commentRouter.delete(
  "/",
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

commentRouter.post(
  "/like",
  loginRequired,
  checkGrade,
  asyncHandler(async (req, res) => {
    const { commentId } = req.body;
    const { user } = req;
    const commentService = new CommentService(Post, Comment);
    await commentService.updateLike(commentId, user.id);
    res.status(200).json({ isOk: true });
  })
);

export default commentRouter;
