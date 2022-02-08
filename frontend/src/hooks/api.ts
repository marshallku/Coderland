import { useEffect, useState } from "react";

export default function useApi<T>(promiseData: Promise<T | undefined>) {
  const [data, setData] = useState<T | undefined>();

  useEffect(() => {
    async function changeHandler() {
      setData(await promiseData);
    }

    changeHandler();
  });

  return data;
}
