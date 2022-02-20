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
  _id: string;
  googleId: string;
  nickname: string;
  name: string;
  profile: string;
  grade: 0;
  track: string;
  github: string;
}

interface IAuthor {
  _id?: string;
  nickname: string;
}

interface IPost {
  _id: string;
  title: string;
  contents: string;
  subject: TSubject;
  views: number;
  bookmarks: number;
  likes: number;
  author: IAuthor;
  isAuthor?: boolean;
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
  subject: "gather";
  author: IAuthor;
  isAuthor?: boolean;
  bookmarks: number;
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
  author?: IAuthor;
  isPostAuthor: boolean;
  isAuthor?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface IComment {
  _id: string;
  contents: string;
  author?: IAuthor;
  postId?: string;
  likes?: number;
  isLiked?: boolean;
  isPostAuthor: boolean;
  isAuthor?: boolean;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
  replies: Array<ICommentReply>;
}

interface IPagination {
  currentPage: number;
  lastPage: number;
}

interface INotification {
  title: string;
  isNewNotification: boolean;
  to: string;
}

// Api Base
interface ISuccessResponse {
  isOk: true;
  hasNewNotification?: boolean;
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
  post: IGatherPost;
}
// Comment
interface ICommentListResponse extends ISuccessResponse {
  comments: Array<IComment>;
}

interface ICommentModifyResponse extends ISuccessResponse {
  commentId: string;
}

interface IGatherRequestResponse extends ISuccessResponse {
  userId: string;
}

interface IUserResponse extends ISuccessResponse {
  user: IUser;
}
// Auth
interface IAuthKeyResponse extends ISuccessResponse {
  authKey: string;
}

interface IImageResponse extends ISuccessResponse {
  fileName: string;
}

interface ICarouselResponse extends ISuccessResponse {
  carousel: Array<ICarouselItem>;
}

interface INotificationResponse extends ISuccessResponse {
  notification: Array<INotification>;
}
