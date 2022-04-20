import { parseCookie } from "../utils/cookie";
import createInstance from "../utils/fetcher";

const instance = createInstance({
  baseUrl: `${import.meta.env.VITE_API_SERVER_URI}`,
  commonHeader: {
    Authorization: `Bearer ${
      /**
       *  FIXME: use useAuthStore instead getting value directly
       *
       * It's causing dependency cycle now.
       * try create instance with zustand.
       */
      localStorage.getItem("token") || parseCookie()["access-token"]
    }`,
  },
});

export default instance;
