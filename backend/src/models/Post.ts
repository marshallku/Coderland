import mongoose from "mongoose";
import { IPostDocument, IPostModel, subjects } from "post";
import { IUserDocument } from "user";
import { UserSchema } from "./User";
import configs from "../config";

function conditionBySubject(subject: string, category: string) {
  if (["study", "code", "team"].includes(category)) {
    return { subject, category };
  }
  return { subject };
}

function isAnonymous(subject: subjects) {
  return ["review", "chat"].includes(subject);
}

function createDto(
  subject: string,
  postDto: Partial<IPostDocument>,
  gatherDto: Partial<IPostDocument>
) {
  if (subject === "gathering") {
    return {
      ...postDto,
      ...gatherDto,
    };
  }
  return postDto;
}

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
    category: {
      type: String,
      default: "none",
    },
    icon: {
      type: String,
    },
    area: {
      type: String,
    },
    tags: {
      type: [String],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    members: {
      type: [UserSchema],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PostSchema.statics.findAllPosts = async (
  subject: string,
  category: string,
  currentPage: number
) => {
  const { perPage } = configs;
  const condition = conditionBySubject(subject, category);
  const total = await Post.countDocuments(condition);
  const lastPage = Math.ceil(total / perPage);
  const posts = await Post.find(condition)
    .populate("author", "nickname")
    .sort("-createdAt")
    .skip((currentPage - 1) * perPage)
    .limit(perPage);

  return [
    posts,
    {
      currentPage,
      lastPage,
    },
  ];
};

PostSchema.statics.findPostById = async (postId: string) => {
  const post = await Post.findById(postId).populate("author", "nickname");
  return post;
};

PostSchema.statics.createPost = async (
  user: IUserDocument,
  postDto: Partial<IPostDocument>,
  gatherDto: Partial<IPostDocument>
) => {
  const { subject } = postDto;
  const dto = createDto(subject, postDto, gatherDto);
  const post = await Post.create({
    ...dto,
    author: user,
    anonymous: isAnonymous(subject),
  });
  return post;
};

PostSchema.statics.updatePost = async (
  postId: string,
  postDto: Partial<IPostDocument>,
  gatherDto: Partial<IPostDocument>
) => {
  const { subject } = postDto;
  const dto = createDto(subject, postDto, gatherDto);
  await Post.findByIdAndUpdate(postId, {
    ...dto,
    anonymous: isAnonymous(subject),
  });
};

PostSchema.statics.deletePost = async (postId: string) => {
  await Post.findByIdAndDelete(postId);
};

const Post = mongoose.model<IPostDocument, IPostModel>("Post", PostSchema);

export { Post };
