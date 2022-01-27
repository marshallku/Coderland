import { Request, Response, NextFunction } from "express";
import { Comment } from "../../models/Comment";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { commentId } = req.params;
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
