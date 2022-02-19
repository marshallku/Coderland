import { Request, Response, NextFunction } from "express";
import { Comment } from "../../models/Comment";

/**
 * 댓글 존재 여부, 댓글 소유 권한 확인
 * 댓글 조회 후 존재하지 않을 경우 Error,
 * 댓글 소유 권한이 로그인한 유저의 것이 아닌 경우 Error
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  const { commentId } = req.body;
  const { user } = req;
  try {
    const comment = await Comment.findCommentById(commentId);

    if (comment.author.id !== user.id) {
      return next(new Error("권한이 없어요..."));
    }
  } catch (error) {
    return next(new Error("존재하지 않는 댓글입니다."));
  }
  return next();
};
