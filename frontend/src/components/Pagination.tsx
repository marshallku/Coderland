import "./Pagination.css";
import { useLayoutEffect, useState } from "react";

export default function Pagination({
  paginate,
  paginateInfo,
}: IPaginationProps) {
  if (!paginateInfo) {
    return <div>게시글이 없습니다.</div>;
  }
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(
    paginateInfo?.currentPage
  );
  const totalPageNumber = paginateInfo?.lastPage;

  const getPage = (newPageNumber: number) => {
    if (newPageNumber <= totalPageNumber && newPageNumber >= 1) {
      setCurrentPageNumber(newPageNumber);
    }
  };

  useLayoutEffect(() => {
    let newPageNumberLength = 5;
    let newPageNumberStart = currentPageNumber - 2;
    if (currentPageNumber < 3) {
      newPageNumberStart = 0;
      newPageNumberLength += 1;
    }
    const newPageNumbers: any = Array.from(
      { length: newPageNumberLength },
      (_, i) => {
        const newPageNumber = newPageNumberStart + i;
        if (newPageNumber > 0 && newPageNumber <= totalPageNumber) {
          return newPageNumber;
        }
        return null;
      }
    );
    setPageNumbers(newPageNumbers);
    paginate(currentPageNumber);
  }, [currentPageNumber]);

  return (
    <div className="pagination">
      {currentPageNumber > 1 ? (
        <>
          <button
            type="button"
            className="pagination__arrow"
            onClick={() => getPage(1)}
          >
            <i
              className="icon-first_page"
              role="img"
              aria-label="첫번째 페이지로 이동하는 화살표 아이콘"
            />
          </button>
          <button
            type="button"
            className="pagination__arrow"
            onClick={() => getPage(currentPageNumber - 1)}
          >
            <i
              className="icon-navigate_before"
              role="img"
              aria-label="이전 페이지로 이동하는 화살표 아이콘"
            />
          </button>
        </>
      ) : (
        <>
          <div className="pagination__arrow disabled" />
          <div className="pagination__arrow disabled" />
        </>
      )}
      <ul className="pagination__page-number-box">
        {pageNumbers
          .filter((pageNumber) => pageNumber)
          .map((pageNumber) => (
            <button
              type="button"
              className={`page-number ${
                currentPageNumber === pageNumber ? "selected" : ""
              }`}
              key={pageNumber}
              onClick={() => getPage(pageNumber)}
              aria-label={`${pageNumber}번 페이지로 이동하는 버튼`}
            >
              {pageNumber}
            </button>
          ))}
      </ul>
      {currentPageNumber < totalPageNumber ? (
        <>
          <button
            type="button"
            className="pagination__arrow"
            onClick={() => getPage(currentPageNumber + 1)}
          >
            <i
              className="icon-navigate_next"
              role="img"
              aria-label="다음 페이지로 이동하는 화살표 아이콘"
            />
          </button>
          <button
            type="button"
            className="pagination__arrow"
            onClick={() => getPage(totalPageNumber)}
          >
            <i
              className="icon-last_page"
              role="img"
              aria-label="마지막 페이지로 이동하는 화살표 아이콘"
            />
          </button>
        </>
      ) : (
        <>
          <div className="pagination__arrow disabled" />
          <div className="pagination__arrow disabled" />
        </>
      )}
    </div>
  );
}
