import { LeanDocument } from "mongoose";
import { IPostDocument } from "post";
import { IUserDocument } from "user";
import { createAuthorName } from "./index";

function parsedMembers(members: LeanDocument<IUserDocument>[]) {
  return members.map(({ _id, nickname, profile }) => ({
    _id,
    nickname,
    profile,
  }));
}

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
    viewUsers,
    ...rest
  } = post;

  if (subject === "gather") {
    return {
      ...rest,
      tags,
      memberCount: members.length,
      members: parsedMembers(members),
      isCompleted,
      area,
      category,
      anonymous,
      views: viewUsers.length,
      isBookmarked: bookmarkUsers.includes(userId),
      isLiked: likeUsers.includes(userId),
      author: createAuthorName(anonymous, author, post._id.toString()),
      isAuthor: `${author._id}` === `${userId}`,
    };
  }
  return {
    ...rest,
    anonymous,
    views: viewUsers.length,
    isBookmarked: bookmarkUsers.includes(userId),
    isLiked: likeUsers.includes(userId),
    author: createAuthorName(anonymous, author, post._id.toString()),
    isAuthor: `${author._id}` === `${userId}`,
  };
}
