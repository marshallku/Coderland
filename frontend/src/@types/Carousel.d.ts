interface ICarouselItem {
  title: string;
  to: string;
  image: string;
}

interface ICarouselProps {
  data: Array<ICarouselItem>;
}

declare type TDirection = "prev" | "next" | "none" | "reset";
