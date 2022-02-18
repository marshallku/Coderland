import { ICommentDocument } from "comment";
import { parseReply, createAuthorName } from "./index";

export default (comment: ICommentDocument, userId: string, postId: string) => {
  const {
    _id,
    author,
    anonymous,
    replies,
    isPostAuthor,
    likeUsers,
    isDeleted,
    contents,
    ...rest
  } = comment.toObject();
  if (isDeleted) {
    return {
      _id,
      isDeleted,
      contents: "",
      replies: parseReply(replies, anonymous, author, isPostAuthor, postId),
    };
  }
  return {
    ...rest,
    _id,
    isDeleted,
    isPostAuthor,
    contents,
    isLiked: likeUsers.includes(userId),
    replies: parseReply(replies, anonymous, author, isPostAuthor, postId),
    author: createAuthorName(anonymous, author, postId),
  };
};
