import mongoose from "mongoose";
import { IPostDocument, IPostModel, subjects } from "post";
import { IUserDocument } from "user";
import { UserSchema } from "./User";

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
  if (subject === "gather") {
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
    excerpt: {
      type: String,
      default: "",
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
    viewUsers: {
      type: [String],
      default: [],
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
    bookmarks: {
      type: Number,
      default: 0,
      min: 0,
    },
    bookmarkUsers: {
      type: [String],
      default: [],
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
      default: [],
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
  currentPage: number,
  perPage: number
) => {
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

PostSchema.statics.countViews = async (postId: string, userId: string) => {
  await Post.findByIdAndUpdate(postId, {
    $addToSet: { viewUsers: userId },
  });
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
  const { subject, title, contents } = postDto;
  const dto = createDto(subject, { title, contents }, gatherDto);
  await Post.findByIdAndUpdate(postId, {
    ...dto,
  });
};

PostSchema.statics.deletePost = async (postId: string) => {
  const post = await Post.findByIdAndDelete(postId);
  return post.toObject();
};

PostSchema.statics.completePost = async (postId: string) => {
  await Post.findByIdAndUpdate(postId, {
    isCompleted: true,
  });
};

PostSchema.statics.updateLike = async (postId: string, userId: string) => {
  // 먼저 찾아서, 유저가 좋아요 눌렀는지 확인하고,
  // 눌렀으면 취소, 안눌렀으면 좋아요
  const post = await Post.findById(postId);
  if (post.likeUsers.length > 0 && post.likeUsers.includes(userId)) {
    await Post.findByIdAndUpdate(postId, {
      $pull: { likeUsers: userId },
      $inc: { likes: -1 },
    });
    return;
  }
  await Post.findByIdAndUpdate(postId, {
    $push: { likeUsers: userId },
    $inc: { likes: 1 },
  });
};

PostSchema.statics.updateBookmark = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (post.bookmarkUsers.length > 0 && post.bookmarkUsers.includes(userId)) {
    await Post.findByIdAndUpdate(postId, {
      $pull: { bookmarkUsers: userId },
      $inc: { bookmarks: -1 },
    });
    return;
  }
  await Post.findByIdAndUpdate(postId, {
    $push: { bookmarkUsers: userId },
    $inc: { bookmarks: 1 },
  });
};

PostSchema.statics.allowAppliedUser = async (
  postId: string,
  user: IUserDocument
) => {
  await Post.findByIdAndUpdate(postId, {
    $push: { members: user },
  });
};

const Post = mongoose.model<IPostDocument, IPostModel>("Post", PostSchema);

export { Post };
