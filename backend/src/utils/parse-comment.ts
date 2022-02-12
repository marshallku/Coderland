import { ICommentDocument } from "comment";
import { parseReply, createAuthorName } from "./index";

export default (comment: ICommentDocument, userId: string, postId: string) => {
  const { author, anonymous, replies, isPostAuthor, likeUsers, ...rest } =
    comment.toObject();
  return {
    ...rest,
    isPostAuthor,
    isLiked: likeUsers.includes(userId),
    replies: parseReply(replies, anonymous, author, isPostAuthor, postId),
    author: createAuthorName(anonymous, author, postId),
  };
};
