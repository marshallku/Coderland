import instance from "./instance";

export default function getCarouselData(): Promise<
  ICarouselResponse | IFailResponse
> {
  return instance.get("/home/carousel");
}
