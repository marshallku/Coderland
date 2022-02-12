import "./PageTitle.css";

export default function PageTitle({ subject }: { subject: TSubject }) {
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

  return <h2 className="page-title">{subjectsInKr[subject]}</h2>;
}
