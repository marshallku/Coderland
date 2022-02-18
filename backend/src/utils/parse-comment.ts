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
      replies: parseReply(
        replies,
        anonymous,
        author,
        isPostAuthor,
        postId,
        userId
      ),
    };
  }
  return {
    ...rest,
    _id,
    isDeleted,
    isPostAuthor,
    contents,
    isLiked: likeUsers.includes(userId),
    isAuthor: `${author._id}` === `${userId}`,
    replies: parseReply(
      replies,
      anonymous,
      author,
      isPostAuthor,
      postId,
      userId
    ),
    author: createAuthorName(anonymous, author, postId),
  };
};
