import mongoose from "mongoose";
import suffleNickname from "./suffle-array";

const anonymousNicknameList = [
  "도도새",
  "카드 병정",
  "체셔 고양이",
  "공작 부인",
  "하트 여왕",
  "모자장수",
  "흰 토끼",
  "하트 왕",
  "시골쥐",
  "레이서",
  "개구리 병사",
  "어린 독수리",
  "물고기 병사",
  "도마뱀",
  "사냥개",
  "토끼",
];

function selectAuthorName(id: string, nicknameList: Array<string>) {
  const index = parseInt(id[0], 16);
  return `익명의 ${nicknameList[index]}`;
}

export default function createAuthorName(
  anonymous: boolean,
  author: { _id: mongoose.Types.ObjectId; nickname: string }
) {
  const nicknameList = suffleNickname(anonymousNicknameList);
  return anonymous
    ? selectAuthorName(author._id.toString(), nicknameList)
    : author.nickname;
}
