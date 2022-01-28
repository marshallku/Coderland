import "./PostList.css";
import { useState, useEffect, useCallback } from "react";

import { dummyPosts } from "../api/dummy";
import Posts from "./Posts";
import Pagination from "./Pagination";

export default function PostList() {
  const [currentPosts, setCurrentPosts] =
    useState<Omit<IPost, "contents" | "subject">[]>();
  const [totalPosts, setTotalPosts] =
    useState<Omit<IPost, "contents" | "subject">[]>();
  const [isLoading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  useEffect(() => {
    async function getTotalAndCurrentPosts() {
      const serverTotalPosts = await dummyPosts.then((result) => result);
      setTotalPosts(serverTotalPosts);

      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const serverCurrentPosts = serverTotalPosts.slice(
        indexOfFirstPost,
        indexOfLastPost
      );

      setCurrentPosts(serverCurrentPosts);
    }
    getTotalAndCurrentPosts();
    setLoading(false);
  }, [currentPage]);

  return (
    <div className="post-list">
      <Posts postList={currentPosts} isLoading={isLoading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts?.length}
        paginate={paginate}
      />
    </div>
  );
}
