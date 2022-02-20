type TCommentMode = "read" | "edit" | "reply";

interface ICommentsProps {
  updatePost: () => void;
  isAuthor?: boolean;
  postId: string;
  members?: Array<IUser>;
}

interface IUniversalComment extends ICommentReply {
  likes?: number;
  isLiked?: boolean;
  isDeleted?: boolean;
  replies?: Array<ICommentReply>;
}

interface ICommentProps {
  updatePost: () => void;
  updateCommentList: () => void;
  members?: Array<IUser>;
  isAuthor?: boolean;
  postId: string;
  parentId?: string;
  data: IUniversalComment;
  focusedId: string;
  setFocusedId: React.Dispatch<React.SetStateAction<string>>;
}

interface ILikeProps {
  likesCount: number;
  setLikesCount: React.Dispatch<React.SetStateAction<number>>;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
}
