import { Router } from "express";
import CommentService from "../../services/comment";
import { Post, Comment } from "../../models";
import { asyncHandler } from "../../utils";
import { checkCommentPermission, loginRequired } from "../middlewares";

const route = Router({ mergeParams: true });

route.post(
  "/",
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

route.get(
  "/",
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

route.put(
  "/:commentId",
  loginRequired,
  checkCommentPermission,
  asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { contents } = req.body;
    const commentService = new CommentService(Post, Comment);
    await commentService.updateComment(commentId, contents);
    res.status(200).json({ isOk: true, commentId });
  })
);

route.delete(
  "/:commentId",
  loginRequired,
  checkCommentPermission,
  asyncHandler(async (req, res) => {
    const { postId, commentId } = req.params;
    const commentService = new CommentService(Post, Comment, postId);
    await commentService.deleteComment(commentId);
    res.status(200).json({ isOk: true, commentId });
  })
);

export default route;
