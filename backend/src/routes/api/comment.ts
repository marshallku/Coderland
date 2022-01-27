import { Router } from "express";
import { createComment, findAllComments } from "../../services/comment";
import asyncHandler from "../../utils/async-handler";
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
    const page = Number(req.query.page) || 1;
    const [comments, pagination] = await findAllComments(postId, page);
    res.status(200).json({ isOk: true, comments, pagination });
  })
);

export default route;
