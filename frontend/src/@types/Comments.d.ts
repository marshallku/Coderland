type TCommentMode = "read" | "edit" | "reply";

interface ICommentsProps {
  updatePost: () => void;
  isAuthor?: boolean;
  postId: string;
  members?: Array<IUser>;
}

interface IUniversalComment extends ICommentReply {
  likes?: number;
  replies?: Array<ICommentReply>;
}

interface ICommentProps {
  updatePost: () => void;
  members?: Array<IUser>;
  isAuthor?: boolean;
  postId: string;
  parentId?: string;
  data: IUniversalComment;
  setCommentList: React.Dispatch<React.SetStateAction<IComment[]>>;
  focused: string;
  setFocused: React.Dispatch<React.SetStateAction<string>>;
}

interface ILikeProps {
  likesCount: number;
  setLikesCount: React.Dispatch<React.SetStateAction<number>>;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
}
