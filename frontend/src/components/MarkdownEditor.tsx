import { useState } from "react";
import MarkdownViewer from "./MarkdownViewer";
import "./MarkdownEditor.css";

export default function MarkdownEditor(props: MarkdownEditorProps) {
  const [mode, setMode] = useState<EditorMode>("edit");
  const { value, setValue } = props;
  const highlight = (target: EditorMode) =>
    target === mode ? "highlight" : "";

  return (
    <div className="markdown-editor">
      <nav>
        <ul className="markdown-editor__buttons">
          <li>
            <button
              className={`markdown-editor__button ${highlight("edit")}`}
              onClick={() => setMode("edit")}
            >
              편집
            </button>
          </li>
          <li>
            <button
              className={`markdown-editor__button ${highlight("view")}`}
              onClick={() => setMode("view")}
            >
              보기
            </button>
          </li>
        </ul>
      </nav>
      <div className="markdown-editor__container">
        {mode === "edit" ? (
          <textarea
            className="markdown-editor__textarea"
            placeholder="내용을 입력해주세요. (마크다운 지원)"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        ) : (
          <MarkdownViewer value={value} />
        )}
      </div>
    </div>
  );
}
