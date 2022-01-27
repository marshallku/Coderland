import "./Pagination.css";

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
      <i className="pagination__arrow icon-navigate_before" />
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
      <i className="pagination__arrow icon-navigate_next" />
    </div>
  );
}
