import { IUserDocument } from "user";
import { Comment } from "../models/Comment";

export async function createComment(
  user: IUserDocument,
  commentDto: { postId: string; contents: string }
) {
  const comment = await Comment.createComment(user, commentDto);
  return comment._id;
}

export async function findAllComments(postId: string, page: number) {
  const [comments, pagination] = await Comment.findAllComments(postId, page);
  return [comments, pagination];
}
