import AddPostButton from "./AddPostButton";
import PostList from "./PostList";

export default function ListPage({ subject }: { subject: TSubject }) {
  const subjectsInKr: {
    // eslint-disable-next-line no-unused-vars
    [key in TSubject]: string;
  } = {
    article: "댓글 남겨줘",
    dev: "개발 정보",
    recruit: "취업 정보",
    chat: "잡담",
    review: "후기 / 회고",
    gather: "팀원 모집",
    study: "스터디 모집",
    code: "모각코 모집",
    team: "팀 모집",
  };

  return (
    <>
      <h1 className="main-title main-title--post-list">
        {subjectsInKr[subject]}
      </h1>
      <PostList subject={subject} />
      <AddPostButton to={subject} />
    </>
  );
}
