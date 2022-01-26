import mongoose from "mongoose";
import { IPostDocument, IPostModel } from "post";
import { IUserDocument } from "user";
import { CommentSchema } from "./Comment";

export const PostSchema = new mongoose.Schema<IPostDocument>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 50,
    },
    contents: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [CommentSchema],
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    subject: {
      type: String,
      required: true,
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

PostSchema.statics.findPostById = async (postId: string) => {
  const post = await Post.findOne({ id: postId }).populate(
    "author",
    "nickname"
  );
  return post;
};

PostSchema.statics.createPost = async (
  user: IUserDocument,
  postDto: Partial<IPostDocument>
) => {
  const { title, contents, subject } = postDto;
  const post = await Post.create({
    title,
    contents,
    subject,
    author: user,
  });
  return post;
};

const Post = mongoose.model<IPostDocument, IPostModel>("Post", PostSchema);

export { Post };
