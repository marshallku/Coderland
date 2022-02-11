// Type
declare type TSubject =
  | "article"
  | "dev"
  | "recruit"
  | "chat"
  | "review"
  | "gather"
  | "study"
  | "code"
  | "team";
declare type TGatherCategory = "gather" | "study" | "code" | "team";

interface IUser {
  googleId: string;
  nickname: string;
  name: string;
  profile: string;
  grade: 0;
  track: string;
  gitlab: string;
  token: string;
  authKey?: string;
}

interface IPost {
  _id: string;
  title: string;
  contents: string;
  subject: TSubject;
  views: number;
  likes: number;
  author: string;
  commentCount: number;
  isBookmarked?: boolean;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IPostInList extends Omit<IPost, "contents" | "subject"> {
  excerpt: string;
}

interface IGatherPost {
  _id: string;
  title: string;
  contents: string;
  author: string;
  likes: number;
  views: number;
  commentCount: number;
  isBookmarked?: boolean;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
  area: string;
  category: TGatherCategory;
  tags: Array<string>;
  members: Array<IUser>;
  icon: string;
}

interface IGatherPostInList extends Omit<IGatherPost, "contents"> {
  excerpt: string;
}

interface ICommentReply {
  _id: string;
  contents: string;
  author: string | "anonymity";
  isPostAuthor: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IComment {
  _id: string;
  contents: string;
  author: string | "anonymity";
  postId: string;
  likes: number;
  isPostAuthor: boolean;
  createdAt: string;
  updatedAt: string;
  replies: Array<ICommentReply>;
}

interface IPagination {
  currentPage: number;
  lastPage: number;
}

// Api Base
interface ISuccessResponse {
  isOk: true;
}

interface IFailResponse {
  isOk: false;
  msg: string;
}

// Api Response
// Post
interface IPostListResponse extends ISuccessResponse {
  posts: Array<IPostInList>;
  pagination: IPagination;
}

interface IPostResponse extends ISuccessResponse {
  post: IPost;
}

interface IPostModifyResponse extends ISuccessResponse {
  postId: string;
}

// Gather Post
interface IGatherPostListResponse extends ISuccessResponse {
  posts: Array<IGatherPostInList>;
  pagination: IPagination;
}

interface IGatherPostResponse extends ISuccessResponse {
  gather: IGatherPost;
}

interface IGatherModifyResponse extends ISuccessResponse {
  gatherId: string;
}

// Comment
interface ICommentListResponse extends ISuccessResponse {
  comments: Array<IComment>;
}

interface ICommentModifyResponse extends ISuccessResponse {
  commentId: string;
}
