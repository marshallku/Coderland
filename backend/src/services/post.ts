import { Post } from "../models/Post";

export async function findPostById(postId: string) {
  const post = await Post.findPostById(postId);
  return post;
}
