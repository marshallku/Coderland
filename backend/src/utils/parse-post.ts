import { LeanDocument } from "mongoose";
import { IPostDocument } from "post";
import { createAuthorName } from "./index";

export default function parsePostBySubject(
  subject: string,
  post: LeanDocument<IPostDocument>,
  userId?: string
) {
  const {
    author,
    anonymous,
    tags,
    members,
    isCompleted,
    area,
    category,
    likeUsers,
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
      author: createAuthorName(anonymous, author),
    };
  }
  return {
    ...rest,
    anonymous,
    isLiked: likeUsers.includes(userId),
    author: createAuthorName(anonymous, author),
  };
}
