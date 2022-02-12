import { Router } from "express";
import ReplyService from "../../services/reply";

import { asyncHandler } from "../../utils";
import { loginRequired } from "../../passport/guards";
import { checkReplyPermission, checkGrade } from "../middlewares";

const replyRouter = Router({ mergeParams: true });

// 답글 생성
replyRouter.post(
  "/",
  loginRequired,
  checkGrade,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { commentId, contents } = req.body;
    const replyService = new ReplyService();
    await replyService.createReply(commentId, user, contents);
    res.status(201).json({ isOk: true });
  })
);

// 답글 수정
replyRouter.put(
  "/",
  loginRequired,
  checkReplyPermission,
  asyncHandler(async (req, res) => {
    const { replyId, commentId, contents } = req.body;
    const replyService = new ReplyService();
    await replyService.updateReply({ commentId, replyId, contents });
    res.status(200).json({ isOk: true });
  })
);

// 답글 삭제
replyRouter.delete(
  "/",
  loginRequired,
  checkReplyPermission,
  asyncHandler(async (req, res) => {
    const { replyId, commentId } = req.body;
    const replyService = new ReplyService();
    await replyService.deleteReply({ commentId, replyId });
    res.status(200).json({ isOk: true });
  })
);

export default replyRouter;
