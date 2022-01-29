import { Router } from "express";
import { asyncHandler } from "../../utils";
import { loginRequired } from "../middlewares";
import { Comment } from "../../models";
import ReplyService from "../../services/reply";

const replyRouter = Router({ mergeParams: true });

replyRouter.post(
  "/",
  loginRequired,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { commentId, contents } = req.body;
    const replyService = new ReplyService(Comment);
    await replyService.createReply(commentId, user, contents);
    res.status(201).json({ isOk: true });
  })
);

export default replyRouter;
