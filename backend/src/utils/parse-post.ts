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
    bookmarkUsers,
    ...rest
  } = post;

  if (subject === "gather") {
    return {
      ...rest,
      tags,
      memberCount: members.length,
      members,
      isCompleted,
      area,
      category,
      anonymous,
      isBookmarked: bookmarkUsers.includes(userId),
      isLiked: likeUsers.includes(userId),
      author: createAuthorName(anonymous, author),
    };
  }
  return {
    ...rest,
    anonymous,
    isBookmarked: bookmarkUsers.includes(userId),
    isLiked: likeUsers.includes(userId),
    author: createAuthorName(anonymous, author),
  };
}
