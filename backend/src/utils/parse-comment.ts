import { ICommentDocument } from "comment";
import { parseReply, createAuthorName } from "./index";

export default (comment: ICommentDocument, userId: string, postId: string) => {
  const {
    author,
    anonymous,
    replies,
    isPostAuthor,
    likeUsers,
    isDeleted,
    contents,
    ...rest
  } = comment.toObject();
  return {
    ...rest,
    isDeleted,
    isPostAuthor: isDeleted ? false : isPostAuthor,
    contents: isDeleted ? "" : contents,
    isLiked: likeUsers.includes(userId),
    replies: parseReply(replies, anonymous, author, isPostAuthor, postId),
    author: createAuthorName(anonymous, author, postId),
  };
};
