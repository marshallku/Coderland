import mongoose from "mongoose";
import { IUserDocument } from "user";
import {
  ICommentDocument,
  ICommentModel,
  ParentDocument,
  IReplyDocument,
} from "comment";
import configs from "../config/index";
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
    anonymous: {
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
  });

  return comment;
};

CommentSchema.statics.findAllComments = async (
  parentId: string,
  currentPage: number
) => {
  const { perPage } = configs;
  const total = await Comment.countDocuments({
    parentId,
  });
  const lastPage = Math.ceil(total / perPage);

  const comments = await Comment.find({
    parentId,
  })
    .populate("author", "nickname")
    .sort("created")
    .skip((currentPage - 1) * perPage)
    .limit(perPage);

  return [comments, { currentPage, lastPage }];
};

CommentSchema.statics.updateComment = async (
  commentId: string,
  contents: string
) => {
  await Comment.findByIdAndUpdate(commentId, { contents });
};

CommentSchema.statics.deleteComment = async (commentId) => {
  await Comment.findByIdAndDelete(commentId);
};

CommentSchema.statics.createReply = async (commentId, author, contents) => {
  const replyId = new mongoose.Types.ObjectId();
  await Comment.findByIdAndUpdate(commentId, {
    $push: { replies: { _id: replyId, author, contents } },
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
  const { commentId, replyId } = replyDto;
  await Comment.findByIdAndUpdate(commentId, {
    $pull: { replies: { _id: replyId } },
  });
};

const Comment = mongoose.model<ICommentDocument, ICommentModel>(
  "Comment",
  CommentSchema
);

export { Comment };
