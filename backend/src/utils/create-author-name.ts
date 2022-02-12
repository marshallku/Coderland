import mongoose from "mongoose";

const anonymousNicknameList = [
  "레이서",
  "도도새",
  "트럼프 병정",
  "공작 부인",
  "하트 여왕",
  "하트 왕",
  "모자장수",
  "흰 토끼",
  "산쥐",
  "요리사",
  "바닷가재",
  "비둘기",
  "쐐기벌레",
  "강아지",
  "가짜 거북",
  "도마뱀",
];

function selectAuthorName(id: string, nicknameList: Array<string>) {
  const index = parseInt(id.slice(0, 10), 16) % 16;
  return `익명의 ${nicknameList[index]}`;
}

function rotateArray(array: string[], idx: number) {
  const spliced = array.splice(array.length - idx, array.length);
  array.unshift(...spliced);
  return array;
}

export default function createAuthorName(
  anonymous: boolean,
  author: { _id: mongoose.Types.ObjectId; nickname: string },
  postId: string
) {
  const rotateIdx = parseInt(postId.slice(0, 10), 16) % 16;

  const nicknameList = rotateArray(anonymousNicknameList, rotateIdx);
  // console.log(selectAuthorName(author._id.toString(), nicknameList));
  return anonymous
    ? selectAuthorName(author._id.toString(), nicknameList)
    : author.nickname;
}
