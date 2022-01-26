import { pickRandom } from "./array";

const dummyNames = [
  "도도새",
  "하트 여왕",
  "체셔 고양이",
  "모자장수",
  "흰 토끼",
  "트럼프 병사",
  "쐐기벌레",
  "3월의 토끼",
];

// TODO: 매번 무작위 이름을 반환할지, 유저마다 익명으로 표시할 이름을 저장해둘지 논의
export default () => `익명의 ${pickRandom(dummyNames)}`;
