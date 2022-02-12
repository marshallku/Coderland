import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/Post";

/**
 * 포스트 존재 여부 확인
 * 포스트 소유 권한 확인
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const { user } = req;

  try {
    const post = await Post.findPostById(postId);

    if (post.author.id !== user.id) {
      return next(new Error("권한이 없어요..."));
    }
  } catch (error) {
    return next(new Error("존재하지 않는 글입니다."));
  }
  return next();
};
