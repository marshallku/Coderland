import mongoose from "mongoose";
import { IUserDocument } from "user";
import { ICommentDocument, ICommentModel } from "comment";
import configs from "../config/index";
import { Post } from "./Post";

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
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
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
  commentDto
) => {
  const { postId, contents } = commentDto;
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $inc: { commentCount: 1 },
    },
    { new: true }
  );

  const comment = await Comment.create({
    contents,
    postId: post,
    anonymous: post.anonymous,
    author: user,
  });

  return comment;
};

CommentSchema.statics.findAllComments = async (
  postId: string,
  page: number
) => {
  const postObjId = new mongoose.Types.ObjectId(postId);

  const { perPage } = configs;
  const total = await Comment.countDocuments({
    postId: postObjId,
  });
  const totalPage = Math.ceil(total / perPage);

  const comments = await Comment.find({
    postId: postObjId,
  })
    .populate("author", "nickname")
    .sort("created")
    .skip((page - 1) * perPage)
    .limit(perPage);

  return [comments, { page, nextPage: page < totalPage }];
};

CommentSchema.statics.updateComment = async (
  commentId: string,
  contents: string
) => {
  await Comment.findByIdAndUpdate(commentId, { contents });
};

CommentSchema.statics.deleteComment = async (postId, commentId) => {
  await Post.findByIdAndUpdate(postId, {
    $inc: { commentCount: -1 },
  });

  await Comment.findByIdAndDelete(commentId);
};

const Comment = mongoose.model<ICommentDocument, ICommentModel>(
  "Comment",
  CommentSchema
);

export { Comment };
