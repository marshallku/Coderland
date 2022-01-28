import { Router } from "express";
import {
  createComment,
  findAllComments,
  updateComment,
  deleteComment,
} from "../../services/comment";
import asyncHandler from "../../utils/async-handler";
import checkCommentPermission from "../middlewares/check-comment-permission";
import loginRequired from "../middlewares/login-required";

const route = Router({ mergeParams: true });

route.post(
  "/",
  loginRequired,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { postId } = req.params;
    const { contents } = req.body;
    const commentId = await createComment(user, { postId, contents });
    res.status(201).json({ isOk: true, commentId });
  })
);

route.get(
  "/",
  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const currentPage = Number(req.query.currentPage) || 1;
    const [comments, pagination] = await findAllComments(postId, currentPage);
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
    await updateComment(commentId, contents);
    res.status(200).json({ isOk: true, commentId });
  })
);

route.delete(
  "/:commentId",
  loginRequired,
  checkCommentPermission,
  asyncHandler(async (req, res) => {
    const { postId, commentId } = req.params;
    await deleteComment(postId, commentId);
    res.status(200).json({ isOk: true, commentId });
  })
);

export default route;
