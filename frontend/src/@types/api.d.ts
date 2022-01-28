// Type
declare type subject = "article" | "dev" | "recruit" | "chat" | "review";
declare type gatherCategory = "study" | "code" | "team";

interface IUser {
  googleId: string;
  nickname: string;
  name: string;
  profile: string;
  grade: 0;
  track: string;
  gitlab: string;
}

interface IPost {
  _id: string;
  title: string;
  contents: string;
  subject: subject;
  view: number;
  likes: number;
  author: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

interface IGatherPost {
  _id: string;
  title: string;
  contents: string;
  author: string;
  likes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
  area: string;
  tags: Array<string>;
  members: Array<IUser>;
  memberCount: number;
}

interface IComment {
  _id: string;
  contents: string;
  author: string;
  postId: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
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
  posts: Array<Omit<IPost, "contents" | "subject">>;
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
  posts: Array<IGatherPost>;
  pagination: IPagination;
}

interface IGatherPostResponse extends ISuccessResponse {
  gather: IGatherPost;
}

// Comment
interface ICommentListResponse extends ISuccessResponse {
  comments: Array<IComment>;
}

interface ICommentModifyResponse extends ISuccessResponse {
  commentId: string;
}
