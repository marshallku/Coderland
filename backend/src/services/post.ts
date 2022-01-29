import { IUserDocument } from "user";
import { IPostDocument } from "post";
import { Post } from "../models/Post";
import parsePostBySubject from "../utils/parse-post";

export async function findAllPosts(
  subject: string,
  category: string,
  currentPage: number
) {
  const [posts, pagination] = await Post.findAllPosts(
    subject,
    category,
    currentPage
  );
  const parsedPosts = posts.map((post) =>
    parsePostBySubject(post.subject, post.toObject())
  );

  return [parsedPosts, pagination];
}

export async function findPostById(postId: string) {
  try {
    const post = await Post.findPostById(postId);
    return parsePostBySubject(post.subject, post.toObject());
  } catch (error) {
    throw new Error("존재하지 않는 글입니다.");
  }
}

export async function createPost(
  user: IUserDocument,
  postDto: Partial<IPostDocument>,
  gatherDto?: Partial<IPostDocument>
) {
  const post = await Post.createPost(user, postDto, gatherDto);
  return post.id;
}

export async function updatePost(
  postId: string,
  postDto: Partial<IPostDocument>,
  gatherDto: Partial<IPostDocument>
) {
  await Post.updatePost(postId, postDto, gatherDto);
}

export async function deletePost(postId: string) {
  await Post.deletePost(postId);
}
