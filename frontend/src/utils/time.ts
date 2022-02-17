export const SECOND_TO_MS = 1000;
export const MINUTE_TO_SECOND = 60;
export const HOUR_TO_SECOND = MINUTE_TO_SECOND * 60;
export const DAY_TO_SECOND = HOUR_TO_SECOND * 24;
export const WEEK_TO_DAY = 7;
export const WEEK_TO_SECOND = WEEK_TO_DAY * DAY_TO_SECOND;
export const MONTH_TO_DAY = 30.43; // (365.24 / 12).toFixed(2)
export const MONTH_TO_SECOND = MONTH_TO_DAY * DAY_TO_SECOND;
export const YEAR_TO_DAY = 365.24; // leap year
export const YEAR_TO_SECOND = YEAR_TO_DAY * DAY_TO_SECOND;

export function formatToReadableTime(dateString: string): string {
  const now = new Date().getTime();
  const date = new Date(dateString).getTime();
  if (Number.isNaN(date)) return "어떤 오후";

  const { floor } = Math;
  const diffToSeconds = (now - date) / SECOND_TO_MS;
  const diffToDay = floor(diffToSeconds / DAY_TO_SECOND);
  const lessThanDay = diffToSeconds < DAY_TO_SECOND;

  if (lessThanDay) {
    if (diffToSeconds < 5 * MINUTE_TO_SECOND) {
      return "방금";
    }

    if (diffToSeconds < HOUR_TO_SECOND) {
      return `${floor(diffToSeconds / MINUTE_TO_SECOND)}분 전`;
    }

    return `${floor(diffToSeconds / HOUR_TO_SECOND)}시간 전`;
  }

  if (diffToDay < WEEK_TO_DAY) {
    return `${diffToDay}일 전`;
  }

  if (diffToDay < 2 * MONTH_TO_DAY) {
    return `${floor(diffToDay / WEEK_TO_DAY)}주 전`;
  }

  if (diffToDay < YEAR_TO_DAY) {
    return `${floor(diffToDay / MONTH_TO_DAY)}개월 전`;
  }

  return `${floor(diffToDay / YEAR_TO_DAY)}년 전`;
}

/*
    Usage Example
    
    const newFormatter = timeFormatter("YYYY년 M월 DD일");

    console.log(newFormatter.format(new Date("2022-01-27").toDateString()));
    // Returns 2022년 1월 27일
*/
export function timeFormatter(pattern: string): {
  // eslint-disable-next-line no-unused-vars
  format: (dateString: string) => string;
} {
  const regex = /(Y+)|(M+)|(D+)|(a)|(g)|(i)/gim;
  const matchGroup = pattern.match(regex);

  if (!matchGroup) throw new Error("잘못된 형식입니다");

  const formatString = (date: Date, str: string) => {
    switch (str) {
      case "YY":
        return `${date.getFullYear()}`.slice(2);
      case "YYYY":
        return `${date.getFullYear()}`;
      case "M":
        return `${date.getMonth() + 1}`;
      case "MM": {
        const month = date.getMonth() + 1;

        if (month < 10) {
          return `0${month}`;
        }

        return `${month}`;
      }
      case "D":
        return `${date.getDate()}`;
      case "DD": {
        const day = date.getDate();

        if (day < 10) {
          return `0${day}`;
        }

        return `${day}`;
      }

      case "a":
      case "A":
        return date.getHours() >= 12 ? "오후" : "오전";
      case "H":
        return `${date.getHours()}`;
      case "g": {
        const hour = date.getHours();

        return `${hour > 12 ? hour - 12 : hour}`;
      }
      case "i": {
        const minute = date.getMinutes();

        if (minute < 10) {
          return `0${minute}`;
        }

        return `${minute}`;
      }

      default:
        return "";
    }
  };

  return {
    format: (dateString: string) => {
      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) return "어떤 오후";

      return matchGroup.reduce(
        (acc, cur) => acc.replace(cur, formatString(date, cur)),
        pattern
      );
    },
  };
}
