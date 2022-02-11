interface IInstanceProps {
  baseUrl?: string;
  timeOut?: number;
}

declare type TError = (msg?: string) => IFailResponse;

declare type TDummyPromise = () => Promise<IFailResponse>;

declare type TSendRequest = (
  resource: string,
  init?: RequestInit
) => Promise<any | IFailResponse>;

interface IInstance {
  get(resource: string, init?: RequestInit): Promise<any | IFailResponse>;
  post(resource: string, init?: RequestInit): Promise<any | IFailResponse>;
  delete(resource: string, init?: RequestInit): Promise<any | IFailResponse>;
  put(resource: string, init?: RequestInit): Promise<any | IFailResponse>;
  patch(resource: string, init?: RequestInit): Promise<any | IFailResponse>;
}
