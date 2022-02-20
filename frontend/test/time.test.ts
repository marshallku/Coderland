import { formatToReadableTime, timeFormatter } from "../src/utils/time";

describe("시간 관련 유틸 작동 검사", () => {
  test("현재 중심 시간", () => {
    expect(formatToReadableTime("엘리스")).toBe("어떤 오후");
    // TODO: 어떻게 테스트할지 생각하기
  });

  test("포매터", () => {
    const formatter = timeFormatter("YYYY년 M월 DD일 a g시 i분");

    expect(formatter.format("엘리스")).toBe("어떤 오후");
    expect(formatter.format("2022-01-27T11:23:11.472Z")).toBe(
      "2022년 1월 27일 오전 11시 23분"
    );
  });
});
