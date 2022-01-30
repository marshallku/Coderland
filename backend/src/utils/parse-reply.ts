import { LeanDocument } from "mongoose";
import { IReplyDocument } from "comment";
import { IUserDocument } from "user";

export default (
  replies: LeanDocument<IReplyDocument>[],
  anonymous: boolean,
  commentAuthor: Partial<IUserDocument>,
  isPostAuthor: boolean
) => {
  const parsed = replies.map((reply) => {
    const { author, ...rest } = reply;

    return {
      ...rest,
      isPostAuthor:
        isPostAuthor && commentAuthor._id.toString() === author._id.toString(),
      author: anonymous ? "anonymity" : author.nickname,
    };
  });
  return parsed;
};
