import { Router } from "express";
import { asyncHandler } from "../../utils";
import { loginRequired } from "../middlewares";
import { Comment } from "../../models";
import ReplyService from "../../services/reply";
import checkReplyPermission from "../middlewares/check-reply-permission";

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

replyRouter.put(
  "/",
  loginRequired,
  checkReplyPermission,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { replyId, commentId, contents } = req.body;
    const replyService = new ReplyService(Comment);
    await replyService.updateReply(user, { commentId, replyId, contents });
    res.status(200).json({ isOk: true });
  })
);

replyRouter.delete(
  "/",
  loginRequired,
  checkReplyPermission,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { replyId, commentId } = req.body;
    const replyService = new ReplyService(Comment);
    await replyService.deleteReply(user, { commentId, replyId });
    res.status(200).json({ isOk: true });
  })
);

export default replyRouter;
