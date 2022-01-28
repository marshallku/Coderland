import { useState } from "react";
import { dummyGatherResponse } from "../api/dummy";
import { formatToReadableTime } from "../utils/time";
import useApi from "../api/useApi";
import MarkdownViewer from "../components/MarkdownViewer";
import Comments from "../components/Comments";
import "./GathersDetail.css";

export default function Detail() {
  const [likesStatus, setLikesStatus] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);

  const selected = useApi(dummyGatherResponse);
  // response.find((post) => post._id === params.id);

  // useEffect(() => {}, [likesStatus, bookmarkStatus]);

  function handleBookmarkClick() {
    setBookmarkStatus(!bookmarkStatus);
  }

  function handleLikesClick() {
    setLikesStatus(!likesStatus);
    // TODO: put?patch? 통신하여 likesStatus에 따라 증가/감소값 넘겨주기 (id건네주어서 해당 db값 변경)
    // 참고: async function postTopic(evt) {
    //   const response = await fetch('http://localhost:3000/topics/', {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    // body: JSON.stringify({ _id: , likes: selected +-1 })
    //   });
    //   const result = await response.json();
    //   return result;
    // }
  }

  return (
    <div className="detail">
      <div className="header">
        <h2 className="header__title">{selected?.gather.title}</h2>
        <div className="header-container">
          <div className="header-container-left">
            <div className="header-container__subject">엘리스후기</div>
            <div className="header-container__author">
              {selected?.gather.author}
            </div>
            <div className="header-container__created">
              {formatToReadableTime(selected?.gather.createdAt || "")}
            </div>
          </div>
          <div className="header-container-right">
            <button
              type="button"
              aria-label="북마크 버튼"
              className={
                bookmarkStatus
                  ? "icon-bookmark header-container__bookmark--true"
                  : "icon-bookmark_outline"
              }
              onClick={handleBookmarkClick}
            />
            <button
              type="button"
              aria-label="좋아요 버튼"
              className={`icon-thumb_up${
                likesStatus ? " header-container__likes--true" : ""
              }`}
              onClick={handleLikesClick}
            >
              {selected?.gather.likes}
            </button>
            <div className="header-container__views icon-visibility">
              {selected?.gather.views}
            </div>
          </div>
        </div>
        <div className="gather-container">
          <div className="gather-container__isCompleted">
            {`모집 ${selected?.gather.isCompleted ? "완료" : "중"}`}
          </div>
          <div className="gather-container__area">{selected?.gather.area}</div>

          {/* TODO: 기술스택 추가하여 표시 필요
          <div className="gather-container__tags">{selected?.tags}</div> */}

          <div className="gather-container__memberCount">
            현재원 : {selected?.gather.memberCount}
          </div>
          <div className="gather-container__members">
            {selected?.gather.members.map((member: IMemberProps) => (
              <img
                key={member.nickname}
                src={member.profile}
                alt={`${member.nickname}님의 이미지`}
                title={`${member.nickname} ${member.track}`}
              />
            ))}
          </div>
        </div>
      </div>
      <MarkdownViewer
        value={selected?.gather.contents || ""}
        className="content"
      />
      <Comments />
    </div>
  );
}
