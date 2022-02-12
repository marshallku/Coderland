import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination";
import PostCardItem, { PostCardItemSkeleton } from "./PostCardItem";
import PostListItem, { PostListItemSkeleton } from "./PostListItem";
import parseQuery from "../utils/url";
import { getGatherPostList, getPostList } from "../api";
import toast from "../utils/toast";
import "./PostList.css";
import formatClassName from "../utils/formatClassName";

const USES_CARD_DESIGN = ["gather", "study", "code", "team"];
const SKELETONS_LENGTH = 8;

const subjectsInKr: {
  // eslint-disable-next-line no-unused-vars
  [key in TSubject]: string;
} = {
  article: "댓글 남겨줘",
  dev: "개발 정보",
  recruit: "채용 정보",
  chat: "잡담",
  review: "후기 / 회고",
  gather: "팀원 모집",
  study: "스터디 모집",
  code: "모각코 모집",
  team: "팀 모집",
};

export default function PostList({
  subject,
  limit,
  preventPaginate,
}: IPostListProps) {
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
      const gatherSubject = subject.replace("gather", "");
      const postsResponse = await (usesCardDesign
        ? getGatherPostList({
            category: gatherSubject as TGatherCategory,
            perPage: limit,
            page: currentPage,
          })
        : getPostList({
            subject,
            perPage: limit,
            page: currentPage,
          }));

      if (postsResponse.isOk === false) {
        toast("글 목록을 불러오는 데 실패했습니다!");
        return;
      }

      setResponse(postsResponse);
    }
    getCardOrListPosts();
  }, [currentPage]);

  const ListOfElements = () => {
    if (response) {
      if (usesCardDesign) {
        return (response.posts as Array<IGatherPostInList>).map(PostCardItem);
      }

      return (response.posts as Array<IPostInList>).map(PostListItem);
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
    <>
      <div
        className={`post-list ${
          usesCardDesign ? "post-list--card" : "post-list--list"
        }`}
      >
        <h2
          className={formatClassName(
            "post-list__title",
            limit && "post-list__title--limit"
          )}
        >
          {subjectsInKr[subject]}
        </h2>
        {ListOfElements()}
      </div>
      {!preventPaginate && response && (
        <Pagination paginate={paginate} data={response.pagination} />
      )}
    </>
  );
}
