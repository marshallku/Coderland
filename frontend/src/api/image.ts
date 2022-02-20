import createInstance from "../utils/fetcher";
import { SECOND_TO_MS } from "../utils/time";

const imageInstance = createInstance({
  baseUrl: import.meta.env.VITE_IMAGE_SERVER_URI,
  timeOut: 30 * SECOND_TO_MS,
});

export default function uploadImage(
  file: File
): Promise<IImageResponse | IFailResponse> {
  const data = new FormData();

  data.append("image", file);

  return imageInstance.post("/", {
    body: data,
  });
}
