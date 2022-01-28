import mongoose from "mongoose";
import { IPostDocument, IPostModel, subjects } from "post";
import { IUserDocument } from "user";
import configs from "../config";

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
    commentCount: {
      type: Number,
      default: 0,
    },
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

PostSchema.statics.findAllPosts = async (subject: string, page: number) => {
  const { perPage } = configs;
  const total = await Post.countDocuments({ subject });
  const totalPage = Math.ceil(total / perPage);
  const posts = await Post.find({ subject })
    .populate("author", "nickname")
    .sort("-createdAt")
    .skip((page - 1) * perPage)
    .limit(perPage);
  return [
    posts,
    {
      page,
      nextPage: page < totalPage,
    },
  ];
};

PostSchema.statics.findPostById = async (postId: string) => {
  const post = await Post.findById(postId).populate("author", "nickname");
  return post;
};

function isAnonymous(subject: subjects) {
  return ["review", "chat"].includes(subject);
}

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
    anonymous: isAnonymous(subject),
  });
  return post;
};

PostSchema.statics.updatePost = async (
  postId: string,
  postDto: Pick<IPostDocument, "title" | "contents" | "subject">
) => {
  const { title, contents, subject } = postDto;
  await Post.findByIdAndUpdate(postId, {
    title,
    contents,
    subject,
    anonymous: isAnonymous(subject),
  });
};

PostSchema.statics.deletePost = async (postId: string) => {
  await Post.findByIdAndDelete(postId);
};

const Post = mongoose.model<IPostDocument, IPostModel>("Post", PostSchema);

export { Post };
