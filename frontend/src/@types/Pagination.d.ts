interface IPaginationProps {
  postsPerPage: number;
  totalPosts: number | undefined;
  paginate: (pageNumber: number) => void;
}
