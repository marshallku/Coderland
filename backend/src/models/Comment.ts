import mongoose from "mongoose";
import { IUserDocument } from "user";
import {
  ICommentDocument,
  ICommentModel,
  ParentDocument,
  IReplyDocument,
} from "comment";
import { UserSchema } from "./User";

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

CommentSchema.statics.findCommentById = async (commentId: string) => {
  const comment = await Comment.findById(commentId).populate(
    "author",
    "nickname"
  );
  return comment;
};

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

CommentSchema.statics.findAllComments = async (parentId: string) => {
  const comments = await Comment.find({
    parentId,
  }).populate("author", "nickname");

  return comments;
};

CommentSchema.statics.updateComment = async (
  commentId: string,
  contents: string
) => {
  await Comment.findByIdAndUpdate(commentId, { contents });
};

CommentSchema.statics.deleteComment = async (commentId) => {
  // 삭제가 아니라 삭제된 댓글로 표현
  const comment = await Comment.findById(commentId);
  if (comment.replies.length > 0) {
    // 답글이 있으면 삭제하지 않고 변경
    await comment.updateOne({
      contents: "작성자에 의해 삭제된 댓글입니다.",
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

CommentSchema.statics.updateReply = async (user, replyDto) => {
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

CommentSchema.statics.deleteReply = async (user, replyDto) => {
  // 삭제가 아니라 삭제된 답글로 표현
  const { commentId, replyId } = replyDto;
  await Comment.findByIdAndUpdate(commentId, {
    $pull: { replies: { _id: replyId } },
  });
};

CommentSchema.statics.updateLike = async (
  commentId: string,
  userId: string
) => {
  const comment = await Comment.findById(commentId);
  if (comment.likeUsers.length > 0 && comment.likeUsers.includes(userId)) {
    await Comment.findByIdAndUpdate(commentId, {
      $pull: { likeUsers: userId },
      $inc: { likes: -1 },
    });
    return;
  }
  await Comment.findByIdAndUpdate(commentId, {
    $push: { likeUsers: userId },
    $inc: { likes: 1 },
  });
};

const Comment = mongoose.model<ICommentDocument, ICommentModel>(
  "Comment",
  CommentSchema
);

export { Comment };
