import "./Pagination.css";
import leftArrow from "../../static/icon/left-arrow.svg";
import rightArrow from "../../static/icon/right-arrow.svg";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
}: IPaginationProps) {
  const pageNumber = [];
  if (totalPosts) {
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumber.push(i);
    }
  }

  return (
    <div className="pagination">
      <img className="pagination__arrow" src={leftArrow} alt="leftArrow" />
      <ul className="pagination__number-box">
        {pageNumber.map((number) => (
          <li
            className="number-box__number"
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
      <img className="pagination__arrow" src={rightArrow} alt="rightArrow" />
    </div>
  );
}
