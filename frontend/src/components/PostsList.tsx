import "./PostsList.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { IPostsList } from "../@types/PostsList";
import { postsListInfo } from "../data/dummy";

export default function PostsList() {
  const [postsList, setPostsList] = useState<IPostsList[]>([]);
  function getPostsList() {
    // 임시 더미 데이터
    // API GET /posts 통해 게시글 리스트 정보 받아올 예정
    setPostsList(postsListInfo);
  }

  useEffect(() => {
    getPostsList();
  }, []);

  return (
    <div className="posts-list">
      {postsList.map(({ id, order, category, title, author }) => {
        return (
          <>
            <Link className="posts-list__post" to={`/posts/${id}`}>
              <div className="post__order">{order}</div>
              <div className="post__category">{category}</div>
              <div className="post__title">{title}</div>
              <div className="post__author">{author}</div>
            </Link>
            <hr className="post__hr" />
          </>
        );
      })}
    </div>
  );
}
