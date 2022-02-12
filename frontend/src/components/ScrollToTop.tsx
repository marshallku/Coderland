import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { scrollTo } from "../animation/scroll";
import formatClassName from "../utils/formatClassName";
import { fit } from "../utils/optimizer";
import "./ScrollToTop.css";
/*

    I Know everyone hates magic numbers,
    but do I have to calculate the size of svg element every time user scrolls just because of that?

    Just let me know if you want to modify the size of it.
    @marshallku

*/
const SVG_SIZE = 125.5;

export default function ScrollToTop() {
  const location = useLocation();
  const [progress, setProgress] = useState<number>(0);
  const handleScroll = useMemo(
    () =>
      fit(() => {
        setProgress(
          (window.scrollY /
            (document.documentElement.scrollHeight -
              document.documentElement.clientHeight)) *
            SVG_SIZE
        );
      }),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setProgress(0);
      handleScroll();
    };
  }, [location]);

  return (
    <button
      type="button"
      className={formatClassName(
        "to-top icon-north",
        !!progress && "to-top--revealed"
      )}
      onClick={() => {
        scrollTo(0);
      }}
    >
      <svg
        className="to-top__circle"
        width="44"
        height="44"
        style={{
          strokeDasharray: SVG_SIZE,
          strokeDashoffset: `${SVG_SIZE - progress}`,
        }}
      >
        <circle cx="22" cy="22" r="20" />
      </svg>
    </button>
  );
}
