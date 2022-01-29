import { LeanDocument } from "mongoose";
import { IReplyDocument } from "comment";

export default (
  replies: LeanDocument<IReplyDocument>[],
  anonymous: boolean
) => {
  const parsed = replies.map((reply) => {
    const { author, ...rest } = reply;
    return {
      ...rest,
      author: anonymous ? "anonymity" : author.nickname,
    };
  });
  return parsed;
};
