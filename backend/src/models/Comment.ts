import mongoose from "mongoose";
import { IUserDocument } from "user";
import { ICommentDocument, ICommentModel, ParentDocument } from "comment";
import configs from "../config/index";

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

const Comment = mongoose.model<ICommentDocument, ICommentModel>(
  "Comment",
  CommentSchema
);

export { Comment };
