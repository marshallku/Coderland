import mongoose from "mongoose";
import { IUserDocument } from "user";
import {
  ICommentDocument,
  ICommentModel,
  ParentDocument,
  IReplyDocument,
} from "comment";
import { UserSchema } from "./User";

/**
 * 답글 스키마
 * 내용, 작성자 정보
 */
const ReplySchema = new mongoose.Schema<IReplyDocument>(
  {
    contents: {
      type: String,
      required: true,
    },
    author: { type: UserSchema },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * 댓글 스키마
 * 내용, 작성자, 상위 포스트 ID, 좋아요, 좋아요한 유저, 익명성,
 * 포스트 작성자 여부 (작성자 태그를 위해),
 * 삭제 여부 (답글 있는 경우 글 내용만 삭제)
 * 답글 리스트
 */
export const CommentSchema = new mongoose.Schema<ICommentDocument>(
  {
    contents: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    likeUsers: {
      type: [String],
      default: [],
    },
    anonymous: {
      type: Boolean,
      default: false,
    },
    isPostAuthor: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    replies: [ReplySchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * 댓글 불러오기
 * @param commentId 댓글 ID
 * @returns 댓글
 */
CommentSchema.statics.findCommentById = async (commentId: string) => {
  const comment = await Comment.findById(commentId).populate(
    "author",
    "nickname"
  );
  return comment;
};

/**
 * 댓글 생성
 * @param user 유저 정보
 * @param commentDto 댓글에 담길 내용 (포스트 id, 내용)
 * @returns 생성된 댓글
 */
CommentSchema.statics.createComment = async (
  user: IUserDocument,
  commentDto: { parent: ParentDocument; contents: string }
) => {
  const { parent, contents } = commentDto;

  const comment = await Comment.create({
    contents,
    parentId: parent.id,
    anonymous: parent.anonymous,
    author: user,
    isPostAuthor: parent.author.toString() === user.id,
  });

  return comment;
};

/**
 * 포스트에 종속된 댓글 전체 리스트 호출
 * @param parentId 포스트 ID
 * @returns 댓글 리스트
 */
CommentSchema.statics.findAllComments = async (parentId: string) => {
  const comments = await Comment.find({
    parentId,
  }).populate("author", "nickname");

  return comments;
};

/**
 * 댓글 수정
 * @param commentId 댓글 ID
 * @param contents 수정될 내용
 */
CommentSchema.statics.updateComment = async (
  commentId: string,
  contents: string
) => {
  await Comment.findByIdAndUpdate(commentId, { contents });
};

/**
 * 댓글 삭제
 * @param commentId 삭제할 댓글 ID
 * @returns 댓글 실제 삭제 여부 (답글 있는 경우 false, 답글 없는 경우 true)
 */
CommentSchema.statics.deleteComment = async (commentId) => {
  // 삭제가 아니라 삭제된 댓글로 표현
  const comment = await Comment.findById(commentId);
  if (comment.replies.length > 0) {
    // 답글이 있으면 삭제하지 않고 변경
    await comment.updateOne({
      isDeleted: true,
      likes: 0,
      likeUsers: [],
      isPostAuthor: false,
    });
    return false;
  }
  await comment.deleteOne();
  return true;
};

/**
 * 답글 생성
 * @param commentId 답글이 달릴 댓글 ID
 * @param user 작성자 정보
 * @param contents 내용
 */
CommentSchema.statics.createReply = async (commentId, user, contents) => {
  const replyId = new mongoose.Types.ObjectId();
  await Comment.findByIdAndUpdate(commentId, {
    $push: {
      replies: {
        _id: replyId,
        author: user,
        contents,
      },
    },
  });
};

/**
 * 댓글 수정
 * @param replyDto 답글 들어갈 내용
 */
CommentSchema.statics.updateReply = async (replyDto) => {
  const { commentId, replyId, contents } = replyDto;
  await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: { "replies.$[idx].contents": contents },
    },
    {
      arrayFilters: [{ "idx._id": replyId }],
    }
  );
};

/**
 * 답글 삭제1
 * @param replyDto 답글 삭제에 필요한 댓글 ID, 답글 ID
 */
CommentSchema.statics.deleteReply = async (replyDto) => {
  const { commentId, replyId } = replyDto;
  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $pull: { replies: { _id: replyId } },
    },
    { new: true }
  );
  if (comment.replies.length === 0 && comment.isDeleted) {
    await Comment.findByIdAndDelete(commentId);
  }
};

/**
 * 댓글에 대한 좋아요
 * @param commentId 댓글 ID
 * @param userId 유저 정보
 * @returns void
 */
CommentSchema.statics.addLike = async (commentId: string, userId: string) => {
  const comment = await Comment.findById(commentId);
  if (comment.likeUsers.includes(userId)) {
    return;
  }
  await Comment.findByIdAndUpdate(commentId, {
    $push: { likeUsers: userId },
    $inc: { likes: 1 },
  });
};

CommentSchema.statics.deleteLike = async (
  commentId: string,
  userId: string
) => {
  const comment = await Comment.findById(commentId);
  if (!comment.likeUsers.includes(userId)) {
    return;
  }
  await Comment.findByIdAndUpdate(commentId, {
    $pull: { likeUsers: userId },
    $inc: { likes: -1 },
  });
};

const Comment = mongoose.model<ICommentDocument, ICommentModel>(
  "Comment",
  CommentSchema
);

export { Comment };
