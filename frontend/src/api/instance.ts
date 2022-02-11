import createInstance from "../utils/fetcher";

const instance = createInstance({
  // FIXME: Add URL
  baseUrl: `${import.meta.env.VITE_API_SERVER_URI}`,
});

export default instance;
