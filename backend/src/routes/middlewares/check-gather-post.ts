import { Request, Response, NextFunction } from "express";
import { Post } from "../../models";

/**
 * 모임 글 존재 여부 확인
 * 로그인 유저 모임글 소유 권한 확인
 * 모임 글 여부 확인
 * 이미 모집 완료된 글인지 확인
 * 이미 등록된 유저인지, 유저가 존재하는 유저인지 확인
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req;
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findPostById(postId);
    // 권한 체크
    if (post.author.id !== user.id) {
      return next(new Error("권한이 없어요..."));
    }
    // gather인지 체크
    if (post.subject !== "gather") {
      return next(new Error("허용되지 않은 접근입니다."));
    }
    // 이미 모집된 글 체크
    if (post.isCompleted) {
      return next(new Error("이미 마감된 모임입니다."));
    }
    // 이미 등록된 유저 체크 & 그 유저가 존재하는지까지
    if (post.members.some((member) => member.id === userId)) {
      return next(new Error("이미 등록된 인원입니다."));
    }
  } catch (error) {
    return next(new Error("존재하지 않는 글입니다."));
  }
  return next();
};
