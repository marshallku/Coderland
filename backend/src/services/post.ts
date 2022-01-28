import { IUserDocument } from "user";
import { IPostDocument } from "post";
import { Post } from "../models/Post";

export async function findAllPosts(subject: string, currentPage: number) {
  const [posts, pagination] = await Post.findAllPosts(subject, currentPage);
  const parsedPosts = posts.map((post) => {
    const { author, anonymous, ...rest } = post.toObject();
    return {
      ...rest,
      anonymous,
      author: anonymous ? "anonymity" : author.nickname,
    };
  });
  return [parsedPosts, pagination];
}

export async function findPostById(postId: string) {
  try {
    const post = await Post.findPostById(postId);
    const { author, anonymous, ...rest } = post.toObject();
    return {
      ...rest,
      author: anonymous ? "anonymity" : author.nickname,
    };
  } catch (error) {
    throw new Error("존재하지 않는 글입니다.");
  }
}

export async function createPost(
  user: IUserDocument,
  postDto: Partial<IPostDocument>
) {
  const post = await Post.createPost(user, postDto);
  return post.id;
}

export async function updatePost(
  postId: string,
  postDto: Pick<IPostDocument, "title" | "contents" | "subject">
) {
  await Post.updatePost(postId, postDto);
}

export async function deletePost(postId: string) {
  await Post.deletePost(postId);
}
