import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import formatClassName from "../utils/formatClassName";
import "./Carousel.css";

const MINIMAL_MOVED = 50;

export default function Carousel({ data }: ICarouselProps) {
  const [index, setIndex] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [touchStartCoord, setTouchStartCoord] = useState<number>(0);
  const [touchMoved, setTouchMoved] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);

  const isFromSameOrigin = (uri: string) =>
    uri.startsWith(window.location.origin) || uri.startsWith("/");

  const slide = (direction: TDirection) => {
    if (index === 0 && direction === "prev") {
      return;
    }

    if (index === data.length - 1 && direction === "next") {
      return;
    }

    if (direction === "reset") {
      setIndex(0);
      return;
    }

    const indexes = {
      prev: -1,
      none: 0,
      next: 1,
    } as const;

    setIndex(index + indexes[direction]);
  };

  const handleResize = () => {
    const { current } = container;

    if (!current) {
      return;
    }
    setContainerWidth(current.offsetWidth);
  };

  const handleTouchStart = (xCoord: number) => {
    setTouchMoved(0);
    setTouchStartCoord(xCoord);
    setIsMoving(true);
  };

  const handleTouchMove = (xCoord: number) => {
    if (!isMoving) {
      return;
    }
    setTouchMoved(touchStartCoord - xCoord);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchMoved) > MINIMAL_MOVED) {
      slide(touchMoved < 0 ? "prev" : "next");
    }

    setTouchStartCoord(0);
    setTouchMoved(0);
    setIsMoving(false);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="carousel"
      ref={container}
      role="button"
      tabIndex={0}
      onMouseDown={(event) => {
        handleTouchStart(event.clientX);
      }}
      onMouseMove={(event) => {
        handleTouchMove(event.clientX);
      }}
      onMouseUp={handleTouchEnd}
      onMouseOut={handleTouchEnd}
      onBlur={handleTouchEnd}
      onTouchStart={(event) => {
        handleTouchStart(event.touches[0].clientX);
      }}
      onTouchMove={(event) => {
        handleTouchMove(event.touches[0].clientX);
      }}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel__slider">
        <div
          className={formatClassName(
            "carousel__items",
            isMoving && "carousel__items--moving"
          )}
          style={{
            transform: `translate3d(${
              index * -containerWidth - touchMoved
            }px, 0, 0)`,
          }}
        >
          {data.map((item) => (
            <article className="carousel-item" key={item.title}>
              <figure className="carousel-item__thumbnail">
                <img src={item.image} alt={item.title} />
              </figure>
              <header className="carousel-item__header">
                <h2 className="carousel-item__title">{item.title}</h2>
                {isFromSameOrigin(item.to) ? (
                  <Link to={item.to} className="carousel-item__view-more">
                    더 보기 <i className="icon-east" />
                  </Link>
                ) : (
                  <a
                    href={item.to}
                    className="carousel-item__view-more"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    더 보기 <i className="icon-east" />
                  </a>
                )}
              </header>
            </article>
          ))}
        </div>
      </div>
      <div className="carousel__indicators">
        {data.map((item, i) => (
          <div
            key={item.title}
            className={formatClassName(
              "carousel__indicator",
              index === i && "carousel__indicator--highlight"
            )}
          >
            <i
              className={`icon-${
                index === i ? "favorite" : "favorite_outline"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
