import dummyAsync from "./dummyAsync";

export const dummyMarkDown = `
# My Awesome Title

Lorem ipsum dolor sit **amet**, consectetur adipiscing elit. Sed eros urna, sagittis in justo nec, commodo congue sapien. Etiam commodo auctor diam at placerat. Nam lobortis at lorem in euismod. In fermentum suscipit erat vitae laoreet. Integer vel faucibus diam. Quisque luctus dignissim nisi eu auctor. Suspendisse gravida ipsum ac lorem pellentesque tempor. Quisque quis orci efficitur augue ornare ornare id eu ligula. Pellentesque porta felis ut mauris varius varius. Interdum et malesuada fames ac ante ipsum primis in _faucibus_.

## Image

![alt text](https://example.com/image.jpg)

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
  googleId: "1230419308012123",
  nickname: "트럼프 병정",
  name: "홍길동",
  profile: "https://i.imgur.com/0kXBBC3.png",
  grade: 0,
  track: "SW 엔지니어 트랙 1기",
  gitlab: "https://kdt-gitlab.elice.io/marshallku",
};

const tmpUser2: IUser = {
  googleId: "1230419308012123",
  nickname: "3월의 토끼",
  name: "김태연",
  profile: "https://i.imgur.com/0kXBBC3.png",
  grade: 0,
  track: "SW 엔지니어 트랙 1기",
  gitlab: "https://kdt-gitlab.elice.io/marshallku",
};

const tmpComments: Array<IComment> = [
  {
    _id: "6af3af681248ec28ad187628",
    contents:
      "엘리스 SW 엔지니어 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: "하트 여왕",
    postId: "",
    likes: 1,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
  },
  {
    _id: "60f6af69124eef28ad1676e3",
    contents:
      "엘리스 AI 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: "3월의 토끼",
    postId: "",
    likes: 3,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
  },
  {
    _id: "80f6ac6812485f2ead1876e7",
    contents:
      "엘리스 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: "하트 여왕",
    postId: "",
    likes: 10,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
  },
];

const tmpPagination: IPagination = {
  currentPage: 3,
  lastPage: 8,
};

const tmpPostList: Array<Omit<IPost, "contents" | "subject">> = [
  {
    _id: "60f6af6812485f28ad1876e7",
    title: "First Post",
    view: 30,
    likes: 20,
    commentCount: 5,
    author: "도도새",
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
  },
  {
    _id: "60f9475b934f247bad759a2d",
    title: "Second Post",
    view: 40,
    likes: 30,
    commentCount: 5,
    author: "도도새",
    createdAt: "2022-01-26T10:23:38.981Z",
    updatedAt: "2022-01-26T10:23:38.981Z",
  },
];

const tmpGatherList: Array<IGatherPost> = [
  {
    _id: "611b6748bfc2290fd11ec5a5",
    title: "모집 완료 안 된 글",
    contents: "도도새와 함께하는 사이드 프로젝트",
    author: "도도새",
    likes: 30,
    views: 40,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    isCompleted: false,
    area: "서울시 종로구",
    memberCount: 3,
    tags: ["html5", "css3", "javascript"],
    members: [tmpUser],
  },
  {
    _id: "611e6748bff22900d11ec5a5",
    title: "모집은 안료됐으나 사람은 꽉 안 찬 글",
    contents: "체셔 고양이와 함께하는 타입스크립트 스터디",
    author: "체셔 고양이",
    likes: 30,
    views: 40,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    isCompleted: true,
    area: "서울시 강남구",
    memberCount: 3,
    tags: ["typescript"],
    members: [tmpUser, tmpUser2],
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
    view: 30,
    likes: 20,
    commentCount: 5,
    author: "도도새",
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
  gather: {
    _id: "611b6748bfc2290fd11ec5a5",
    title: "모집 완료 안 된 글",
    contents: "도도새와 함께하는 사이드 프로젝트",
    author: "도도새",
    views: 30,
    likes: 40,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    isCompleted: false,
    area: "서울시 종로구",
    memberCount: 3,
    tags: ["html5", "css3", "javascript"],
    members: [tmpUser],
  },
});

export const dummyComments = dummyAsync(tmpComments);

export const dummyCommentsResponse: Promise<ICommentListResponse> = dummyAsync({
  isOk: true,
  comments: tmpComments,
});

export const dummyUser = dummyAsync(tmpUser);
