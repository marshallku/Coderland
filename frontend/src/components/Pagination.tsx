import { useLayoutEffect, useState } from "react";
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
      <button
        type="button"
        disabled={currentIndex <= 3}
        className="pagination__arrow"
        onClick={() => setCurrentIndex(1)}
      >
        <i
          className="icon-first_page"
          role="img"
          aria-label="첫번째 페이지로 이동하는 화살표 아이콘"
        />
      </button>
      <button
        type="button"
        disabled={currentIndex <= 1}
        className="pagination__arrow"
        onClick={() => setCurrentIndex(currentIndex - 1)}
      >
        <i
          className="icon-navigate_before"
          role="img"
          aria-label="이전 페이지로 이동하는 화살표 아이콘"
        />
      </button>
      <ul className="pagination__page-number-box">
        {Array.from({ length: Math.min(PAGES_TO_DISPLAY, max) }, (_, i) => {
          const page = firstPage + i;
          if (i > max || i < 0) return 0;

          return page;
        })
          .filter((page) => !!page)
          .map((page) => (
            <button
              type="button"
              className={`page-number ${
                currentIndex === page ? "selected" : ""
              }`}
              key={page}
              onClick={() => setCurrentIndex(page)}
              aria-label={`${page}페이지로 이동`}
            >
              {page}
            </button>
          ))}
      </ul>
      <button
        type="button"
        disabled={currentIndex >= max}
        className="pagination__arrow"
        onClick={() => setCurrentIndex(currentIndex + 1)}
      >
        <i
          className="icon-navigate_next"
          role="img"
          aria-label="다음 페이지로 이동하는 화살표 아이콘"
        />
      </button>
      <button
        type="button"
        disabled={currentIndex > max - 3}
        className="pagination__arrow"
        onClick={() => setCurrentIndex(max)}
      >
        <i
          className="icon-last_page"
          role="img"
          aria-label="마지막 페이지로 이동하는 화살표 아이콘"
        />
      </button>
    </div>
  );
}
