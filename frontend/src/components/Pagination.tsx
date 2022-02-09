import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatClassName from "../utils/formatClassName";
import "./Pagination.css";

const PAGES_TO_DISPLAY = 5;

function PaginationButton({
  to,
  disableIf,
  icon,
  ariaLabel,
  setCurrentIndex,
}: IPaginationButtonProps) {
  return (
    <Link
      to={`?page=${to}`}
      className={formatClassName(
        "pagination__arrow",
        disableIf && "pagination__arrow--disabled"
      )}
      onClick={() => setCurrentIndex(to)}
    >
      <i className={`icon-${icon}`} role="img" aria-label={ariaLabel} />
    </Link>
  );
}

export default function Pagination({ paginate, data }: IPaginationProps) {
  const [currentIndex, setCurrentIndex] = useState(data.currentPage);
  const max = data.lastPage;
  const pageChecker = Math.max(2, PAGES_TO_DISPLAY - 1 - (max - currentIndex));
  const firstPage = Math.max(1, currentIndex - pageChecker);

  useLayoutEffect(() => {
    paginate(currentIndex);
  }, [currentIndex]);

  return (
    <div className="pagination">
      <PaginationButton
        to={1}
        disableIf={currentIndex <= Math.ceil(PAGES_TO_DISPLAY / 2)}
        icon="first_page"
        ariaLabel="첫 페이지로"
        setCurrentIndex={setCurrentIndex}
      />
      <PaginationButton
        to={currentIndex - 1}
        disableIf={currentIndex <= 1}
        icon="navigate_before"
        ariaLabel="이전 페이지로"
        setCurrentIndex={setCurrentIndex}
      />
      <ul className="pagination__page-number-box">
        {Array.from(
          { length: Math.min(PAGES_TO_DISPLAY, max) },
          (_, i) => firstPage + i
        ).map((page) => (
          <Link
            key={page}
            to={`?page=${page}`}
            className={formatClassName(
              "page-number",
              currentIndex === page && "selected"
            )}
            onClick={() => setCurrentIndex(page)}
            aria-label={`${page}페이지로 이동`}
          >
            {page}
          </Link>
        ))}
      </ul>
      <PaginationButton
        to={currentIndex + 1}
        disableIf={max <= currentIndex}
        icon="navigate_next"
        ariaLabel="다음 페이지로"
        setCurrentIndex={setCurrentIndex}
      />
      <PaginationButton
        to={max}
        disableIf={max - Math.ceil(PAGES_TO_DISPLAY / 2) < currentIndex}
        icon="last_page"
        ariaLabel="마지막 페이지로"
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}
