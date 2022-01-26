import { Request, Response, NextFunction } from "express";
import { Post } from "../models/Post";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const { user } = req;
  const post = await Post.findPostById(postId);
  if (post.author.id !== user.id) {
    return next(new Error("권한이 없어요..."));
  }
  return next();
};
