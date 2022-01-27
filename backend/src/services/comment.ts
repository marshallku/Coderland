import { IUserDocument } from "user";
import { Comment } from "../models/Comment";

export async function createComment(
  user: IUserDocument,
  commentDto: { postId: string; contents: string }
) {
  try {
    const comment = await Comment.createComment(user, commentDto);
    return comment._id;
  } catch (error) {
    throw new Error("존재하지 않는 글입니다.");
  }
}

export async function findAllComments(postId: string, page: number) {
  const [comments, pagination] = await Comment.findAllComments(postId, page);
  const parsedComments = comments.map((comment) => {
    const { author, anonymous, ...rest } = comment.toObject();
    return {
      ...rest,
      anonymous,
      author: anonymous ? "anonymity" : author.nickname,
    };
  });
  return [parsedComments, pagination];
}

export async function updateComment(commentId: string, contents: string) {
  try {
    await Comment.updateComment(commentId, contents);
  } catch (error) {
    throw new Error("존재하지 않는 글입니다.");
  }
}

export async function deleteComment(postId: string, commentId: string) {
  try {
    await Comment.deleteComment(postId, commentId);
  } catch (error) {
    throw new Error("존재하지 않는 글입니다.");
  }
}
