import { IUserDocument, IUserModel } from "user";
import { IPostDocument, IPostModel } from "post";
import { parsePostBySubject } from "../utils";
import { User, Post } from "../models";

export default class PostService {
  private PostModel: IPostModel;

  private UserModel: IUserModel;

  constructor() {
    this.PostModel = Post;
    this.UserModel = User;
  }

  async findAllPosts(
    subject: string,
    category: string,
    currentPage: number,
    perPage: number
  ) {
    const [posts, pagination] = await this.PostModel.findAllPosts(
      subject,
      category,
      currentPage,
      perPage
    );
    const parsedPosts = posts.map((post) =>
      parsePostBySubject(post.subject, post.toObject())
    );
    return [parsedPosts, pagination];
  }

  async findPostById(postId: string, userId: string) {
    try {
      const post = await this.PostModel.findPostById(postId);
      return parsePostBySubject(post.subject, post.toObject(), userId);
    } catch (error) {
      throw new Error("존재하지 않는 글입니다.");
    }
  }

  async createPost(
    user: IUserDocument,
    postDto: Partial<IPostDocument>,
    gatherDto?: Partial<IPostDocument>
  ) {
    const post = await this.PostModel.createPost(user, postDto, gatherDto);
    return post.id;
  }

  async updatePost(
    postId: string,
    postDto: Partial<IPostDocument>,
    gatherDto: Partial<IPostDocument>
  ) {
    await this.PostModel.updatePost(postId, postDto, gatherDto);
  }

  async deletePost(postId: string) {
    const post = await this.PostModel.deletePost(postId);

    // 포스트 삭제 시 유저 정보에 등록된 포스트 삭제
    const lengthBookmarkUsers = post.bookmarkUsers.length;
    if (lengthBookmarkUsers > 0) {
      post.bookmarkUsers.forEach(async (userId) => {
        await User.findByIdAndUpdate(userId, {
          $pull: { bookmarks: post.id },
        });
      });
    }
  }

  async completePost(postId: string) {
    await this.PostModel.completePost(postId);
  }

  async updateLike(postId: string, userId: string) {
    try {
      await this.PostModel.updateLike(postId, userId);
    } catch (error) {
      throw new Error("존재하지 않는 글입니다.");
    }
  }

  async updateBookmark(postId: string, userId: string) {
    try {
      await this.PostModel.updateBookmark(postId, userId);
    } catch (error) {
      throw new Error("존재하지 않는 글입니다.");
    }
    await this.UserModel.updateBookmark(postId, userId);
  }

  async allowAppliedUser(postId: string, userId: string) {
    let user: IUserDocument;
    try {
      user = await User.findById(userId);
    } catch (error) {
      throw new Error("존재하지 않는 유저입니다.");
    }
    await this.PostModel.allowAppliedUser(postId, user);
  }
}
