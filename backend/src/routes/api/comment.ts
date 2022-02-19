import { Router } from "express";
import { asyncHandler } from "../../utils";
import CommentService from "../../services/comment";
import NotificationService from "../../services/notification";
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
    const commentService = new CommentService(postId);
    const commentId = await commentService.createComment(user, contents);

    const notificationServcie = new NotificationService();
    await notificationServcie.addCommentNotification(
      user.id,
      postId,
      commentId
    );

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
    const commentService = new CommentService(postId);
    const comments = await commentService.findAllComments(userId);
    res.status(200).json({ isOk: true, comments });
  })
);

// 댓글 수정
commentRouter.put(
  "/",
  loginRequired,
  checkCommentPermission,
  asyncHandler(async (req, res) => {
    const { contents, commentId } = req.body;
    const commentService = new CommentService();
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
    const commentService = new CommentService(postId);
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
    const commentService = new CommentService();
    await commentService.addLike(commentId, user.id);
    res.status(200).json({ isOk: true });
  })
);

commentRouter.delete(
  "/like",
  loginRequired,
  checkGrade,
  asyncHandler(async (req, res) => {
    const { commentId } = req.body;
    const { user } = req;
    const commentService = new CommentService();
    await commentService.deleteLike(commentId, user.id);
    res.status(200).json({ isOk: true });
  })
);

export default commentRouter;
