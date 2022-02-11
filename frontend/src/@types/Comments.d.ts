type TCommentMode = "read" | "edit" | "reply";

interface ICommentsProps {
  postId: string;
}

interface ICommentState {
  setCommentList: React.Dispatch<React.SetStateAction<IComment[]>>;
}

interface IFocusState {
  focused: string;
  setFocused: React.Dispatch<React.SetStateAction<string>>;
}

interface ICommentProps extends ICommentState, IFocusState {
  postId: string;
  comment: IComment;
}

interface IReplyProps extends IFocusState {
  postId: string;
  parentId: string;
  reply: ICommentReply;
  updateCommentList: () => void;
}

interface ILikeProps {
  likesCount: number;
  setLikesCount: React.Dispatch<React.SetStateAction<number>>;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
}
