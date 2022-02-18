import createInstance from "../utils/fetcher";

const instance = createInstance({
  baseUrl: `${import.meta.env.VITE_API_SERVER_URI}`,
  commonHeader: {
    Authorization: `Bearer ${window.token}`,
  },
});

export default instance;
