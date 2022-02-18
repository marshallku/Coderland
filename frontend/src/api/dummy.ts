import dummyAsync from "./dummyAsync";

export const dummyMarkDown = `
# My Awesome Title

Lorem ipsum dolor sit **amet**, consectetur adipiscing elit. Sed eros urna, sagittis in justo nec, commodo congue sapien. Etiam commodo auctor diam at placerat. Nam lobortis at lorem in euismod. In fermentum suscipit erat vitae laoreet. Integer vel faucibus diam. Quisque luctus dignissim nisi eu auctor. Suspendisse gravida ipsum ac lorem pellentesque tempor. Quisque quis orci efficitur augue ornare ornare id eu ligula. Pellentesque porta felis ut mauris varius varius. Interdum et malesuada fames ac ante ipsum primis in _faucibus_.

## Image

![alt text](https://marshallku.github.io/marshallku/assets/images/taengoo17.gif)

## Link

[Link](https://example.com/)

## List

- Item 1
  - Item 1a
  - Item 1b
- Item 2
- Item 3
- Item 4

## Table

| Left columns | Right columns |
| ------------ | :-----------: |
| left foo     |   right foo   |
| left bar     |   right bar   |
| left baz     |   right baz   |

## Code

\`\`\`ts
const add = (a: number, b: number) => a + b;
\`\`\`

`;

const tmpUser: IUser = {
  _id: "tmp_id",
  googleId: "1230419308012123",
  nickname: "트럼프 병정",
  name: "홍길동",
  profile: "https://i.imgur.com/xCvzudW.png",
  grade: 0,
  track: "SW 엔지니어 트랙 1기",
  github: "https://kdt-gitlab.elice.io/marshallku",
};

const tmpUser2: IUser = {
  _id: "tmp_id",
  googleId: "1230419308012123",
  nickname: "3월의 토끼",
  name: "김태연",
  profile: "https://i.imgur.com/xCvzudW.png",
  grade: 0,
  track: "SW 엔지니어 트랙 1기",
  github: "https://kdt-gitlab.elice.io/marshallku",
};

const tmpComments: Array<IComment> = [
  {
    _id: "6af3af681248ec28ad187628",
    contents:
      "엘리스 SW 엔지니어 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: { nickname: "하트 여왕" },
    postId: "",
    isPostAuthor: false,
    likes: 1,
    isLiked: false,
    isDeleted: false,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    replies: [],
  },
  {
    _id: "6af3af681248ec28ad187ke8",
    contents:
      "엘리스 SW 엔지니어 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: { nickname: "하트 여왕" },
    postId: "",
    isPostAuthor: false,
    likes: 1,
    isLiked: false,
    isDeleted: false,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    replies: [],
  },
  {
    _id: "6af3af681248ec28ad187cj9",
    contents:
      "엘리스 SW 엔지니어 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: { nickname: "하트 여왕" },
    postId: "",
    isPostAuthor: false,
    likes: 1,
    isLiked: false,
    isDeleted: false,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    replies: [],
  },
  {
    _id: "6af3af681248ec28ad187k84",
    contents:
      "엘리스 SW 엔지니어 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: { nickname: "하트 여왕" },
    postId: "",
    isPostAuthor: false,
    likes: 1,
    isLiked: false,
    isDeleted: false,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    replies: [],
  },
  {
    _id: "6af3af681248ec28ad187h36",
    contents:
      "엘리스 SW 엔지니어 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: { nickname: "하트 여왕" },
    postId: "",
    isPostAuthor: false,
    likes: 1,
    isLiked: false,
    isDeleted: false,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    replies: [],
  },
  {
    _id: "6af3af681248ec28ad187k75",
    contents:
      "엘리스 SW 엔지니어 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: { nickname: "하트 여왕" },
    postId: "",
    isPostAuthor: false,
    likes: 1,
    isLiked: false,
    isDeleted: false,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    replies: [],
  },
  {
    _id: "6af3af681248ec28ad187t40",
    contents:
      "엘리스 SW 엔지니어 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: { nickname: "트럼프 병정" },
    postId: "",
    isPostAuthor: true,
    likes: 1,
    isLiked: false,
    isDeleted: false,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    replies: [],
  },
  {
    _id: "6af3af681248ec28ad187936",
    contents:
      "엘리스 SW 엔지니어 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: { nickname: "하트 여왕" },
    postId: "",
    isPostAuthor: false,
    likes: 1,
    isLiked: false,
    isDeleted: false,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    replies: [],
  },
  {
    _id: "6af3af681248ec28ad187528",
    contents:
      "엘리스 SW 엔지니어 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: { nickname: "하트 여왕" },
    postId: "",
    isPostAuthor: true,
    likes: 1,
    isLiked: true,
    isDeleted: false,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    replies: [],
  },
  {
    _id: "60f6af69124eef28ad1676e3",
    contents:
      "엘리스 AI 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: { nickname: "3월의 토끼" },
    postId: "",
    isPostAuthor: false,
    likes: 3,
    isLiked: false,
    isDeleted: true,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    replies: [
      {
        _id: "60f6af69124eef28ad1m57d2",
        contents: "안녕하세요, SW 엔지니어 트랙에 오신 것을 환영합니다.",
        author: { nickname: "모자 장수" },
        isPostAuthor: false,
        createdAt: "2022-01-30T09:23:38.981Z",
        updatedAt: "2022-01-30T09:23:38.981Z",
      },
      {
        _id: "60f6af69124eef28ad48ki59",
        contents: "안녕하세요, AI 트랙에 오신 것을 환영합니다.",
        author: { nickname: "도도새" },
        isPostAuthor: false,
        createdAt: "2022-01-30T09:23:38.981Z",
        updatedAt: "2022-01-30T09:23:38.981Z",
      },
      {
        _id: "60f6af69124eef28ad48k844",
        contents: "안녕하세요, AI 트랙에 오신 것을 환영합니다.",
        author: { nickname: "트럼프 병정" },
        isPostAuthor: true,
        createdAt: "2022-01-30T09:23:38.981Z",
        updatedAt: "2022-01-30T09:23:38.981Z",
      },
      {
        _id: "60f6af69124eef28ad48k270",
        contents: "안녕하세요, SW 엔지니어 트랙에 오신 것을 환영합니다.",
        author: { nickname: "도도새" },
        isPostAuthor: false,
        createdAt: "2022-01-30T09:23:38.981Z",
        updatedAt: "2022-01-30T09:23:38.981Z",
      },
      {
        _id: "60f6af69124eef28ad48k827",
        contents: "안녕하세요, SW 엔지니어 트랙에 오신 것을 환영합니다.",
        author: { nickname: "도도새" },
        isPostAuthor: false,
        createdAt: "2022-01-30T09:23:38.981Z",
        updatedAt: "2022-01-30T09:23:38.981Z",
      },
    ],
  },
  {
    _id: "80f6ac6812485f2ead1876e7",
    contents:
      "엘리스 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: { nickname: "하트 여왕" },
    postId: "",
    isPostAuthor: false,
    likes: 3,
    isLiked: true,
    isDeleted: false,
    createdAt: "2022-02-05T10:23:38.981Z",
    updatedAt: "2022-02-05T10:23:38.981Z",
    replies: [],
  },
  {
    _id: "80f6ac6812485f2ead187j62",
    contents:
      "엘리스 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: { nickname: "하트 여왕" },
    postId: "",
    isPostAuthor: true,
    likes: 1,
    isLiked: false,
    isDeleted: true,
    createdAt: "2022-02-05T10:23:38.981Z",
    updatedAt: "2022-02-05T10:23:38.981Z",
    replies: [],
  },
  {
    _id: "80f6ac6812485f2ead1876k9",
    contents:
      "엘리스 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: { nickname: "하트 여왕" },
    postId: "",
    isPostAuthor: false,
    likes: 1,
    isLiked: true,
    isDeleted: false,
    createdAt: "2022-02-07T10:23:38.981Z",
    updatedAt: "2022-02-07T10:23:38.981Z",
    replies: [],
  },
  {
    _id: "80f6ac6812485f2ead187f38",
    contents:
      "엘리스 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: { nickname: "하트 여왕" },
    postId: "",
    isPostAuthor: false,
    likes: 0,
    isLiked: false,
    isDeleted: false,
    createdAt: "2022-02-10T10:23:38.981Z",
    updatedAt: "2022-02-10T10:23:38.981Z",
    replies: [],
  },
];

const tmpPagination: IPagination = {
  currentPage: 1,
  lastPage: 9,
};

const tmpPostList: Array<IPostInList> = [
  {
    _id: "60f6af6812485f28ad1876e7",
    title: "First Post",
    excerpt: "some text",
    views: 30,
    bookmarks: 20,
    likes: 20,
    commentCount: 5,
    author: { nickname: "도도새" },
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
  },
  {
    _id: "60f9475b934f247bad759a2d",
    title: "Second Post",
    excerpt: "some text",
    views: 40,
    bookmarks: 20,
    likes: 30,
    commentCount: 5,
    author: { nickname: "도도새" },
    createdAt: "2022-01-26T10:23:38.981Z",
    updatedAt: "2022-01-26T10:23:38.981Z",
  },
  {
    _id: "60f6af6812132485f28ad1876e7",
    title: "First Post",
    excerpt: "some text",
    views: 30,
    bookmarks: 20,
    likes: 20,
    commentCount: 5,
    author: { nickname: "도도새" },
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
  },
  {
    _id: "60f9475b934f123247bad759a2d",
    title: "Second Post",
    excerpt: "some text",
    views: 40,
    bookmarks: 20,
    likes: 30,
    commentCount: 5,
    author: { nickname: "도도새" },
    createdAt: "2022-01-26T10:23:38.981Z",
    updatedAt: "2022-01-26T10:23:38.981Z",
  },
  {
    _id: "60f6af6812412385f28ad1876e7",
    title: "First Post",
    excerpt: "some text",
    views: 30,
    bookmarks: 20,
    likes: 20,
    commentCount: 5,
    author: { nickname: "도도새" },
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
  },
  {
    _id: "60f9475b934f21312247bad759a2d",
    title: "Second Post",
    excerpt: "some text",
    views: 40,
    bookmarks: 20,
    likes: 30,
    commentCount: 5,
    author: { nickname: "도도새" },
    createdAt: "2022-01-26T10:23:38.981Z",
    updatedAt: "2022-01-26T10:23:38.981Z",
  },
  {
    _id: "60f6af681241232185f28ad1876e7",
    title: "First Post",
    excerpt: "some text",
    views: 30,
    bookmarks: 20,
    likes: 20,
    commentCount: 5,
    author: { nickname: "도도새" },
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
  },
  {
    _id: "60f9475122133b934f247bad759a2d",
    title: "Second Post",
    excerpt: "some text",
    views: 40,
    bookmarks: 20,
    likes: 30,
    commentCount: 5,
    author: { nickname: "도도새" },
    createdAt: "2022-01-26T10:23:38.981Z",
    updatedAt: "2022-01-26T10:23:38.981Z",
  },
  {
    _id: "60f6af6812132233485f28ad1876e7",
    title: "First Post",
    excerpt: "some text",
    views: 30,
    bookmarks: 20,
    likes: 20,
    commentCount: 5,
    author: { nickname: "도도새" },
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
  },
  {
    _id: "60f9475b934f247b32ad759a2d",
    title: "Second Post",
    excerpt: "some text",
    views: 40,
    bookmarks: 20,
    likes: 30,
    commentCount: 5,
    author: { nickname: "도도새" },
    createdAt: "2022-01-26T10:23:38.981Z",
    updatedAt: "2022-01-26T10:23:38.981Z",
  },
];

const tmpGatherList: Array<IGatherPostInList> = [
  {
    _id: "611b6748bfc2290fd11ec5a5",
    title: "모집 완료 안 된 글",
    subject: "gather",
    excerpt: "도도새와 함께하는 사이드 프로젝트",
    author: { nickname: "도도새" },
    bookmarks: 20,
    likes: 30,
    views: 40,
    commentCount: 5,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    icon: "typescript",
    isCompleted: false,
    area: "서울시 종로구",
    tags: ["html5", "css3", "javascript"],
    members: [tmpUser],
    category: "team",
  },
  {
    _id: "611e6748bff22900d11ec5a5",
    title: "모집은 안료됐으나 사람은 꽉 안 찬 글",
    subject: "gather",
    excerpt: "체셔 고양이와 함께하는 타입스크립트 스터디",
    author: { nickname: "체셔 고양이" },
    bookmarks: 20,
    likes: 30,
    views: 40,
    commentCount: 5,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    icon: "javascript",
    isCompleted: true,
    area: "서울시 강남구",
    tags: ["typescript"],
    members: [tmpUser, tmpUser2],
    category: "study",
  },
];

export const dummyPosts = dummyAsync(tmpPostList);

export const dummyPostsResponse: Promise<IPostListResponse> = dummyAsync({
  isOk: true,
  posts: tmpPostList,
  pagination: tmpPagination,
});

export const dummyPostResponse: Promise<IPostResponse> = dummyAsync({
  isOk: true,
  post: {
    _id: "60f6af6812485f28ad1876e7",
    title: "First Post",
    contents: dummyMarkDown,
    subject: "chat",
    views: 30,
    bookmarks: 20,
    likes: 20,
    commentCount: 5,
    author: { nickname: "도도새" },
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
  },
});

export const dummyGathers = dummyAsync(tmpGatherList);

export const dummyGathersResponse: Promise<IGatherPostListResponse> =
  dummyAsync({
    isOk: true,
    posts: tmpGatherList,
    pagination: tmpPagination,
  });

export const dummyGatherResponse: Promise<IGatherPostResponse> = dummyAsync({
  isOk: true,
  post: {
    _id: "611b6748bfc2290fd11ec5a5",
    title: "모집 완료 안 된 글",
    contents: dummyMarkDown,
    subject: "gather",
    author: { nickname: "도도새" },
    views: 30,
    bookmarks: 20,
    likes: 40,
    commentCount: 5,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    isCompleted: false,
    area: "서울시 종로구",
    icon: "javascript",
    tags: ["html5", "css3", "javascript"],
    members: [tmpUser],
    category: "team",
  },
});

export const dummyComments = dummyAsync(tmpComments);

export const dummyCommentsResponse: Promise<ICommentListResponse> = dummyAsync({
  isOk: true,
  comments: tmpComments,
});

export const dummyUser = dummyAsync(tmpUser);
