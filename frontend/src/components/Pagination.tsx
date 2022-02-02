import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Pagination.css";

const PAGES_TO_DISPLAY = 5;

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
      <Link
        to="?page=1"
        className={`pagination__arrow${
          currentIndex <= 3 ? " pagination__arrow--disabled" : ""
        }`}
        onClick={() => setCurrentIndex(1)}
      >
        <i
          className="icon-first_page"
          role="img"
          aria-label="첫번째 페이지로 이동하는 화살표 아이콘"
        />
      </Link>
      <Link
        to={`?page=${currentIndex - 1}`}
        className={`pagination__arrow${
          currentIndex <= 1 ? " pagination__arrow--disabled" : ""
        }`}
        onClick={() => setCurrentIndex(currentIndex - 1)}
      >
        <i
          className="icon-navigate_before"
          role="img"
          aria-label="이전 페이지로 이동하는 화살표 아이콘"
        />
      </Link>
      <ul className="pagination__page-number-box">
        {Array.from(
          { length: Math.min(PAGES_TO_DISPLAY, max) },
          (_, i) => firstPage + i
        ).map((page) => (
          <Link
            key={page}
            to={`?page=${page}`}
            className={`page-number ${currentIndex === page ? "selected" : ""}`}
            onClick={() => setCurrentIndex(page)}
            aria-label={`${page}페이지로 이동`}
          >
            {page}
          </Link>
        ))}
      </ul>
      <Link
        to={`?page=${currentIndex + 1}`}
        className={`pagination__arrow${
          currentIndex >= max ? " pagination__arrow--disabled" : ""
        }`}
        onClick={() => setCurrentIndex(currentIndex + 1)}
      >
        <i
          className="icon-navigate_next"
          role="img"
          aria-label="다음 페이지로 이동하는 화살표 아이콘"
        />
      </Link>
      <Link
        to={`?page=${max}`}
        className={`pagination__arrow${
          currentIndex > max - 3 ? " pagination__arrow--disabled" : ""
        }`}
        onClick={() => setCurrentIndex(max)}
      >
        <i
          className="icon-last_page"
          role="img"
          aria-label="마지막 페이지로 이동하는 화살표 아이콘"
        />
      </Link>
    </div>
  );
}
