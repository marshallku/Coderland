import { LeanDocument } from "mongoose";
import { IReplyDocument } from "comment";
import { IUserDocument } from "user";
import { createAuthorName } from "./index";

export default function parseReply(
  replies: LeanDocument<IReplyDocument>[],
  anonymous: boolean,
  commentAuthor: Partial<IUserDocument>,
  isPostAuthor: boolean,
  postId: string,
  userId: string
) {
  const parsed = replies.map((reply) => {
    const { author, ...rest } = reply;
    const parsedAuthor = {
      _id: author._id,
      nickname: author.nickname,
    };
    return {
      ...rest,
      isPostAuthor:
        isPostAuthor && commentAuthor._id.toString() === author._id.toString(),
      isAuthor: `${author._id}` === `${userId}`,
      author: createAuthorName(anonymous, parsedAuthor, postId),
    };
  });
  return parsed;
}
