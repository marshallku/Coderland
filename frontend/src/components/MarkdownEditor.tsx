import { useState } from "react";
import MarkdownViewer from "./MarkdownViewer";
import "./MarkdownEditor.css";
import { Textarea } from "./Input";

export default function MarkdownEditor(props: IMarkdownEditorProps) {
  const { id, label, name } = props;
  const [mode, setMode] = useState<TEditorMode>("edit");
  const [value, setValue] = useState("");
  const highlight = (target: TEditorMode) =>
    target === mode ? "highlight" : "";

  return (
    <div className="markdown-editor">
      <nav>
        <ul className="markdown-editor__buttons">
          <li>
            <button
              className={`markdown-editor__button ${highlight("edit")}`}
              onClick={() => setMode("edit")}
              type="button"
            >
              편집
            </button>
          </li>
          <li>
            <button
              className={`markdown-editor__button ${highlight("view")}`}
              onClick={() => setMode("view")}
              type="button"
            >
              보기
            </button>
          </li>
        </ul>
      </nav>
      <div className="markdown-editor__container">
        {mode === "edit" ? (
          <Textarea
            id={id || "markdown-content"}
            className="markdown-editor__textarea"
            name={name}
            label={label || "내용을 입력해주세요. (마크다운 지원)"}
            value={value}
            setValue={setValue}
          />
        ) : (
          <MarkdownViewer className="markdown-editor__preview" value={value} />
        )}
      </div>
    </div>
  );
}
