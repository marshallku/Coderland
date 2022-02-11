import { useEffect, useState } from "react";

// TODO: API 응답에 맞게 업데이트
// TODO: isOk가 false인 경우까지 처리
export default function useApi<T>(promiseData: Promise<T | undefined>) {
  const [data, setData] = useState<T | undefined>();

  useEffect(() => {
    async function changeHandler() {
      setData(await promiseData);
    }

    changeHandler();
  }, []);

  return data;
}
