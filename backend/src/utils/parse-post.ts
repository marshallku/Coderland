import { LeanDocument } from "mongoose";
import { IPostDocument } from "post";

export default function parsePostBySubject(
  subject: string,
  post: LeanDocument<IPostDocument>
) {
  const {
    author,
    anonymous,
    tags,
    members,
    isCompleted,
    area,
    category,
    ...rest
  } = post;
  if (subject === "gathering") {
    return {
      ...rest,
      tags,
      memberCount: members.length,
      members,
      isCompleted,
      area,
      category,
      anonymous,
      author: anonymous ? "anonymity" : author.nickname,
    };
  }
  return {
    ...rest,
    anonymous,
    author: anonymous ? "anonymity" : author.nickname,
  };
}
