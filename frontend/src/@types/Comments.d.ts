type TCommentMode = "read" | "edit" | "reply";

interface ICommentState {
  commentList: IComment[];
  setCommentList: React.Dispatch<React.SetStateAction<IComment[]>>;
}

interface IFocusState {
  focused: string;
  setFocused: React.Dispatch<React.SetStateAction<string>>;
}

interface ICommentProps extends ICommentState, IFocusState {
  comment: IComment;
}

interface IReplyProps extends IFocusState {
  reply: ICommentReply;
}

interface ILikeProps {
  likesCount: number;
  setLikesCount: React.Dispatch<React.SetStateAction<number>>;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
}
