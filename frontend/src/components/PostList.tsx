import "./PostList.css";
import { useState, useEffect } from "react";

import { dummyPosts } from "../data/dummy";
import Posts from "./Posts";
import Pagination from "./Pagination";

export default function PostList() {
  const [currentPosts, setCurrentPosts] = useState<IPostList[]>();
  const [totalPosts, setTotalPosts] = useState<IPostList[]>();
  const [isLoading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  function paginate(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    async function getTotalAndCurrentPosts() {
      const serverTotalPosts = await dummyPosts.then((result) => {
        return result;
      });
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
