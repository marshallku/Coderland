type TCommentMode = "read" | "edit" | "reply";

interface ICommentsProps {
  postId: string;
}

interface IUniversalComment extends ICommentReply {
  likes?: number;
  replies?: Array<ICommentReply>;
}

interface ICommentProps {
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
