import { Request, Response, NextFunction } from "express";
import { Comment } from "../../models/Comment";

/**
 * 답글이 달린 댓글 존재여부 확인
 * 답글 존재 여부 확인
 * 답글 소유 여부 확인
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  const { commentId, replyId } = req.body;
  const { user } = req;
  try {
    const comment = await Comment.findCommentById(commentId);

    const reply = comment.replies.find((reply) => reply.id === replyId);

    if (reply === undefined) {
      return next(new Error("존재하지 않는 글입니다."));
    }
    if (reply.author.id !== user.id) {
      return next(new Error("권한이 없습니다."));
    }
  } catch (error) {
    return next(new Error("존재하지 않는 댓글입니다."));
  }
  return next();
};
