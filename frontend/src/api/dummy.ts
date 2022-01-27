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

const tmpUser = {
  googleId: "1230419308012123",
  nickname: "트럼프 병정",
  name: "홍길동",
  profile: "https://i.imgur.com/0kXBBC3.png",
  grade: 0,
  track: "SW 엔지니어 트랙 1기",
  gitlab: "https://kdt-gitlab.elice.io/marshallku",
};

const tmpComments = [
  {
    _id: "6af3af681248ec28ad187628",
    contents:
      "엘리스 SW 엔지니어 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: "하트 여왕",
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    likes: 1,
  },
  {
    _id: "60f6af69124eef28ad1676e3",
    contents:
      "엘리스 SW 엔지니어 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: "3월의 토끼",
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    likes: 3,
  },
  {
    _id: "80f6ac6812485f2ead1876e7",
    contents:
      "엘리스 SW 엔지니어 트랙은 디지털 융합 신기술 훈련, 기업 맞춤형 국기훈련입니다.",
    author: "하트 여왕",
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    likes: 10,
  },
];

export const dummyPosts = dummyAsync([
  {
    _id: "60f6af6812485f28ad1876e7",
    title: "First Post",
    view: 30,
    likes: 20,
    comments: 5,
    author: "도도새",
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
  },
  {
    _id: "60f9475b934f247bad759a2d",
    title: "Second Post",
    view: 40,
    likes: 30,
    comments: 5,
    author: "도도새",
    createdAt: "2022-01-26T10:23:38.981Z",
    updatedAt: "2022-01-26T10:23:38.981Z",
  },
]);

export const dummyAnonymousPosts = dummyAsync([
  {
    _id: "60ff4d48bc8a5cbbed7b5338",
    title: "First Anonymous Post",
    view: 30,
    likes: 20,
    comments: 5,
    author: "익명의 도도새",
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
  },
  {
    _id: "60ff4faebc8a5cbbed7b5348",
    title: "Second Anonymous Post",
    view: 40,
    likes: 30,
    comments: 5,
    author: "익명의 도도새",
    createdAt: "2022-01-26T10:23:38.981Z",
    updatedAt: "2022-01-26T10:23:38.981Z",
  },
]);

export const dummyAnonymousPost = dummyAsync({
  _id: "60f6af6812485f28ad1876e7",
  title: "First Anonymous Post",
  view: 30,
  likes: 20,
  author: "익명의 도도새",
  createdAt: "2022-01-24T10:23:38.981Z",
  updatedAt: "2022-01-25T10:23:38.981Z",
  contents: dummyMarkDown,
  comments: tmpComments,
});

export const dummyRecruits = dummyAsync([
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
    memberLimitCount: 5,
  },
  {
    _id: "611b6748bfc9c90fd11ec5a5",
    title: "모집 완료는 안 됐으나 사람은 꽉 찬 글",
    contents: "하트 여왕과 함께하는 파이썬 스터디",
    author: "하트 여왕",
    likes: 30,
    views: 40,
    createdAt: "2022-01-24T10:23:38.981Z",
    updatedAt: "2022-01-25T10:23:38.981Z",
    isCompleted: false,
    area: "서울시 마포구",
    memberCount: 5,
    memberLimitCount: 5,
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
    memberLimitCount: 5,
  },
]);

export const dummyRecruit = dummyAsync({
  _id: "611b6748bfc2290fd11ec5a5",
  title: "모집 완료 안 된 글",
  contents: "도도새와 함께하는 사이드 프로젝트",
  author: "도도새",
  comments: tmpComments,
  views: 30,
  likes: 40,
  createdAt: "2022-01-24T10:23:38.981Z",
  updatedAt: "2022-01-25T10:23:38.981Z",
  isCompleted: false,
  area: "서울시 종로구",
  memberCount: 3,
  members: [
    {
      googleId: "1230419308012123",
      nickname: "트럼프 병정",
      name: "홍길동",
      profile: "https://i.imgur.com/0kXBBC3.png",
      grade: 0,
      track: "SW 엔지니어 트랙 1기",
      gitlab: "https://kdt-gitlab.elice.io/marshallku",
    },
    {
      googleId: "1230419308012123",
      nickname: "3월의 토끼",
      name: "김태연",
      profile: "https://i.imgur.com/0kXBBC3.png",
      grade: 0,
      track: "SW 엔지니어 트랙 1기",
      gitlab: "https://kdt-gitlab.elice.io/marshallku",
    },
  ],
});

export const dummyComments = dummyAsync(tmpComments);

export const dummyUser = dummyAsync(tmpUser);
