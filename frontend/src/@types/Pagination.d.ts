interface IPaginationProps {
  postsPerPage: number;
  totalPosts?: number;
  paginate: (pageNumber: number) => void;
}
