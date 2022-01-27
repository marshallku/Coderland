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

CommentSchema.statics.createComment = async (
  user: IUserDocument,
  commentDto
) => {
  const { postId, contents } = commentDto;
  const post = await Post.findById(postId);
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

const Comment = mongoose.model<ICommentDocument, ICommentModel>(
  "Comment",
  CommentSchema
);

export { Comment };
