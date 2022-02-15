import mongoose from "mongoose";
import { IPostDocument, IPostModel, subjects } from "post";
import { IUserDocument } from "user";
import { UserSchema } from "./User";

/**
 * 게시판 주제에 따른 검색 쿼리 설정 함수
 * @param subject 게시판 주제
 * @param category 게시판 상세 카테고리 (모임)
 * @returns 검색 쿼리
 */
function conditionBySubject(subject: string, category: string) {
  if (["study", "code", "team"].includes(category)) {
    return { subject, category };
  }
  return { subject };
}

/**
 * review, chat의 경우 익명으로 처리하기 위한 함수
 * @param subject 게시판 주제
 * @returns 게시판 익명 여부
 */
function isAnonymous(subject: subjects) {
  return ["review", "chat"].includes(subject);
}

/**
 * 모임 글에만 들어갈 내용을 구분하기 위한 함수
 * @param subject 게시판 주제
 * @param postDto 포스트 담길 내용
 * @param gatherDto 모임 포스트에서만 담길 내용
 * @returns 게시판 주제에 따른 저장 내용
 */
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

/**
 * 게시글 리스트 조회
 * @param subject 게시판 주제
 * @param category 게시판 세부 카테고리
 * @param currentPage 현재 페이지
 * @param perPage 페이지 당 게시글
 * @returns 현재 페이지 게시글 리스트
 */
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

/**
 * 포스트 상세 조회
 * @param postId 상세 조회할 포스트 ID
 * @returns 조회 포스트
 */
PostSchema.statics.findPostById = async (postId: string) => {
  const post = await Post.findById(postId).populate("author", "nickname");
  return post;
};

/**
 * 포스트 조회 시 조회 수 업데이트 함수
 * @param postId 조회한 포스트 ID
 * @param userId 조회한 유저 정보
 */
PostSchema.statics.countViews = async (postId: string, userId: string) => {
  await Post.findByIdAndUpdate(postId, {
    $addToSet: { viewUsers: userId },
  });
};

/**
 * 포스트 생성
 * @param user 작성자 정보
 * @param postDto 공통으로 들어갈 내용
 * @param gatherDto 모임 포스트에만 들어갈 내용
 * @returns 생성된 포스트
 */
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

/**
 * 포스트 수정
 * @param postId 수정할 포스트 ID
 * @param postDto 공통으로 들어가는 내용
 * @param gatherDto 모임 글에만 들어가는 내용
 */
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

/**
 * 포스트 삭제
 * @param postId 삭제할 포스트 ID
 * @returns 삭제된 포스트
 */
PostSchema.statics.deletePost = async (postId: string) => {
  const post = await Post.findByIdAndDelete(postId);
  return post.toObject();
};

/**
 * 모임 포스트 모집 완료 함수
 * @param postId 완료 처리할 모임 포스트
 */
PostSchema.statics.completePost = async (postId: string) => {
  await Post.findByIdAndUpdate(postId, {
    isCompleted: true,
  });
};

/**
 * 포스트 좋아요 로직
 * @param postId 좋아요 업데이트할 포스트 ID
 * @param userId 좋아요 클릭한 유저 ID
 * @returns void
 */
PostSchema.statics.addLike = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (post.likeUsers.includes(userId)) {
    return;
  }
  await Post.findByIdAndUpdate(postId, {
    $push: { likeUsers: userId },
    $inc: { likes: 1 },
  });
};

PostSchema.statics.deleteLike = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (!post.likeUsers.includes(userId)) {
    return;
  }
  await Post.findByIdAndUpdate(postId, {
    $pull: { likeUsers: userId },
    $inc: { likes: -1 },
  });
};

/**
 * 포스트 북마크
 * @param postId 북마크 업데이트 포스트 ID
 * @param userId 북마크 지정한 유저 ID
 * @returns void
 */
PostSchema.statics.addBookmark = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (post.bookmarkUsers.includes(userId)) {
    return;
  }
  await Post.findByIdAndUpdate(postId, {
    $push: { bookmarkUsers: userId },
    $inc: { bookmarks: 1 },
  });
};

PostSchema.statics.deleteBookmark = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (!post.bookmarkUsers.includes(userId)) {
    return;
  }
  await Post.findByIdAndUpdate(postId, {
    $pull: { bookmarkUsers: userId },
    $inc: { bookmarks: -1 },
  });
};

/**
 * 모임 포스트 신청자 수락 함수
 * @param postId 모임 포스트 ID
 * @param user 신청한 유저 정보
 */
PostSchema.statics.addAppliedUser = async (
  postId: string,
  user: IUserDocument
) => {
  await Post.findByIdAndUpdate(postId, {
    $push: { members: user },
  });
};

/**
 * 모임 포스트 신청 취소
 * @param postId 모임 포스트 ID
 * @param user 신청한 유저 정보
 */
PostSchema.statics.removeAppliedUser = async (
  postId: string,
  user: IUserDocument
) => {
  await Post.findByIdAndUpdate(postId, {
    $pull: { members: { googleId: user.googleId } },
  });
};

const Post = mongoose.model<IPostDocument, IPostModel>("Post", PostSchema);

export { Post };
