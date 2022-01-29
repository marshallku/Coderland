import { Router } from "express";
import { asyncHandler } from "../../utils";
import { loginRequired } from "../middlewares";
import { Comment } from "../../models";
import CommentService from "../../services/comment";

const replyRouter = Router({ mergeParams: true });

replyRouter.post(
  "/",
  loginRequired,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { contents, commentId } = req.body;
    const commentService = new CommentService(Comment, Comment, commentId);
    const replyId = await commentService.createComment(user, contents);
    res.status(201).json({ isOk: true, replyId });
  })
);

export default replyRouter;
