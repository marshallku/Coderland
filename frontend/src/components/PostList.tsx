import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { dummyGathersResponse, dummyPostsResponse } from "../api/dummy";
import Pagination from "./Pagination";
import PostCardItem, { PostCardItemSkeleton } from "./PostCardItem";
import PostListItem, { PostListItemSkeleton } from "./PostListItem";
import parseQuery from "../utils/url";
import "./PostList.css";

const USES_CARD_DESIGN = ["gather", "study", "code", "team"];
const SKELETONS_LENGTH = 8;

export default function PostList({ subject }: IPostListProps) {
  const [title, setTitle] = useState("");
  const { search } = useLocation();
  const { page } = parseQuery(search);
  const [response, setResponse] = useState<
    IPostListResponse | IGatherPostListResponse
  >();
  const [currentPage, setCurrentPage] = useState<number>(page ? +page || 1 : 1);
  const usesCardDesign = USES_CARD_DESIGN.includes(subject);

  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  useEffect(() => {
    async function getCardOrListPosts() {
      const postsResponse = await (usesCardDesign
        ? dummyGathersResponse
        : dummyPostsResponse);
      setResponse(postsResponse);
    }
    getCardOrListPosts();
  }, [currentPage]);

  useEffect(() => {
    if (subject === "article") setTitle("댓글 남겨줘");
    else if (subject === "dev") setTitle("개발 정보");
    else if (subject === "recruit") setTitle("채용 정보");
    else if (subject === "chat") setTitle("잡담");
    else if (subject === "review") setTitle("후기 / 회고");
    else if (subject === "gather") setTitle("팀원 모집");
    else if (subject === "topView") setTitle("조회수 BEST");
    else if (subject === "latest") setTitle("최신순");
  }, []);

  const ListOfElements = () => {
    if (response) {
      if (usesCardDesign) {
        return (response.posts as Array<IGatherPost>).map(PostCardItem);
      }

      return (response.posts as Array<Omit<IPost, "contents" | "subject">>).map(
        PostListItem
      );
    }

    const tmpArray = Array.from({ length: SKELETONS_LENGTH });

    if (usesCardDesign) {
      // eslint-disable-next-line react/no-array-index-key
      return tmpArray.map((_, i) => <PostCardItemSkeleton key={i} />);
    }

    // eslint-disable-next-line react/no-array-index-key
    return tmpArray.map((_, i) => <PostListItemSkeleton key={i} />);
  };

  return (
    <div
      className={`post-list ${
        subject === "latest" || subject === "topView"
          ? "post-list--highlight"
          : ""
      }`}
    >
      <div className="post-list__header">
        <h2 className="post-list__title">{title}</h2>
        {subject !== "topView" && subject !== "latest" ? (
          <Link to={`/${subject}`}>
            <i
              aria-label={`${title} 더보기`}
              className="icon-keyboard_control"
            />
          </Link>
        ) : (
          ""
        )}
      </div>
      <div
        className={`posts-wrapper ${
          usesCardDesign ? "posts-wrapper--card" : "posts-wrapper--list"
        }`}
      >
        {ListOfElements()}
      </div>
      {response && (
        <Pagination paginate={paginate} data={response.pagination} />
      )}
    </div>
  );
}
