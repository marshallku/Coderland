import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { Input } from "../components/Input";
import MarkdownEditor from "../components/MarkdownEditor";
import Select from "../components/Select";
import "./Add.css";

export default function Add() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const subject = useParams().subject || "chat";
  const subjects: Array<TSubject> = [
    "review",
    "gather",
    "article",
    "dev",
    "recruit",
    "chat",
  ];
  const subjectsInKr = [
    "후기 / 회고",
    "팀원 모집",
    "댓글 남겨줘",
    "개발 정보",
    "채용 정보",
    "잡담",
  ];

  // TODO: 태그 및 지역 자동 완성 기능 추가 검토

  return (
    <div>
      <form
        className="editor"
        onSubmit={(event) => {
          event.preventDefault();
          // TODO: API 통신 추가
        }}
      >
        <div className="editor__item">
          <Input
            id="title"
            name="title"
            label="제목을 작성해주세요"
            value={title}
            setValue={setTitle}
          />
        </div>
        <div className="editor__item">
          <Select
            id="category"
            list={subjects.map((x, i) => ({
              key: x,
              name: subjectsInKr[i],
              selected: x === subject,
            }))}
            cb={({ key }) => navigate(`/add/${key}`)}
          />
        </div>
        {subject === "gather" && (
          <>
            <div className="editor__item">
              <Input
                id="area"
                name="area"
                label="지역을 작성해주세요"
                value={area}
                setValue={setArea}
              />
            </div>
            <div className="editor__item">
              <Input
                id="tags"
                name="tags"
                label="태그를 작성해주세요 (쉼표로 구분)"
                value={tags}
                setValue={setTags}
              />
            </div>
          </>
        )}
        <div className="editor__item">
          <MarkdownEditor
            id="contents"
            name="contents"
            label="내용을 작성해주세요"
            value={content}
            setValue={setContent}
          />
        </div>
        <div className="editor__item">
          <Button value="제출하기" type="submit" />
        </div>
      </form>
    </div>
  );
}
