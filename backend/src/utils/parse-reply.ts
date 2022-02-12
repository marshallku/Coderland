import { LeanDocument } from "mongoose";
import { IReplyDocument } from "comment";
import { IUserDocument } from "user";
import { createAuthorName } from "./index";

export default (
  replies: LeanDocument<IReplyDocument>[],
  anonymous: boolean,
  commentAuthor: Partial<IUserDocument>,
  isPostAuthor: boolean,
  postId: string
) => {
  const parsed = replies.map((reply) => {
    const { author, ...rest } = reply;

    return {
      ...rest,
      isPostAuthor:
        isPostAuthor && commentAuthor._id.toString() === author._id.toString(),
      author: createAuthorName(anonymous, author, postId),
    };
  });
  return parsed;
};
