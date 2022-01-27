import mongoose from "mongoose";
import { IPostDocument, IPostModel, subjects } from "post";
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
  if (!post) {
    throw new Error("존재하지 않는 글입니다.");
  }

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
  const post = await Post.findOneAndUpdate(
    { id: postId },
    {
      title,
      contents,
      subject,
      anonymous: isAnonymous(subject),
    },
    { new: true }
  );
  return post;
};

PostSchema.statics.deletePost = async (postId: string) => {
  await Post.findByIdAndDelete(postId);
};

const Post = mongoose.model<IPostDocument, IPostModel>("Post", PostSchema);

export { Post };
