import { useParams } from "react-router-dom";
import Button from "../components/Button";
import { Input, Textarea } from "../components/Input";
import MarkdownEditor from "../components/MarkdownEditor";
import "./Add.css";

export default function Add() {
  const { subject } = useParams();

  return (
    <div>
      <form className="editor">
        <div className="editor__item">
          <Input id="title" name="title" label="제목을 작성해주세요" />
        </div>
        <div className="editor__item">
          <MarkdownEditor
            id="contents"
            name="contents"
            label="내용을 작성해주세요"
          />
        </div>
        <div className="editor__item">
          <Button value="임시저장" style="multipurpose" />
          <Button value="제출하기" type="submit" />
        </div>
      </form>
    </div>
  );
}
