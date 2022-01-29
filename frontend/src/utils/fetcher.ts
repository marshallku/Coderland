import to from "./awaitTo";

export default function createInstance({
  baseUrl,
  timeOut,
}: IInstanceProps): IInstance {
  const dummyPromise: TDummyPromise = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          isOk: false,
          msg: "Took too long to fetch",
        });
      }, timeOut);
    });

  const error: TError = (msg = "데이터를 불러오는 데 실패했습니다") => ({
    isOk: false,
    msg,
  });

  const sendRequest: TSendRequest = async (
    resource: string,
    init?: RequestInit
  ) => {
    const [responseError, response] = await to(
      timeOut
        ? Promise.race([dummyPromise(), fetch(`${baseUrl}${resource}`, init)])
        : fetch(`${baseUrl}${resource}`, init)
    );

    if (!response || responseError) {
      return error(responseError?.message);
    }

    if (response instanceof Response) {
      if (response.status === 204) {
        return { isOk: true };
      }
      const [, json] = await to(response.json());

      if (!json) {
        return error("JSON 파싱에 실패했습니다");
      }

      return json;
    }

    return response;
  };

  return {
    async get(resource: string, init?: RequestInit) {
      return sendRequest(resource, { ...init, method: "GET" });
    },
    async post(resource: string, init: RequestInit = {}) {
      return sendRequest(resource, { ...init, method: "POST" });
    },
    async delete(resource: string, init: RequestInit = {}) {
      return sendRequest(resource, { ...init, method: "DELETE" });
    },
    async put(resource: string, init: RequestInit = {}) {
      return sendRequest(resource, { ...init, method: "PUT" });
    },
  };
}
