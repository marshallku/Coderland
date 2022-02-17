import { useEffect, useState } from "react";
import MarkdownViewer from "./MarkdownViewer";
import { Textarea } from "./Input";
import { debounce } from "../utils/optimizer";
import formatClassName from "../utils/formatClassName";
import "./MarkdownEditor.css";

const BREAK_POINT = 860;

export default function MarkdownEditor({
  id,
  label,
  name,
  value,
  setValue,
}: IMarkdownEditorProps) {
  const [mode, setMode] = useState<TEditorMode>("edit");
  const [isLarge, setIsLarge] = useState<boolean>(
    BREAK_POINT <= window.innerWidth
  );

  useEffect(() => {
    const update = debounce(() => {
      setIsLarge(BREAK_POINT <= window.innerWidth);
    });

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="markdown-editor">
      <nav>
        <ul className="markdown-editor__buttons">
          <li>
            <button
              className={formatClassName(
                "markdown-editor__button",
                mode === "edit" && "markdown-editor__button--highlight"
              )}
              onClick={() => setMode("edit")}
              type="button"
            >
              편집
            </button>
          </li>
          <li>
            <button
              className={formatClassName(
                "markdown-editor__button",
                mode === "edit" && "markdown-editor__button--highlight"
              )}
              onClick={() => setMode("view")}
              type="button"
            >
              보기
            </button>
          </li>
        </ul>
      </nav>
      <div
        className={`markdown-editor__container markdown-editor__container--${mode}`}
      >
        <Textarea
          id={id || "markdown-content"}
          className="markdown-editor__textarea"
          name={name}
          label={label || "내용을 입력해주세요. (마크다운 지원)"}
          hideLabelOnFocus
          value={value}
          setValue={setValue}
          imageUploadable
        />
        <MarkdownViewer
          className="markdown-editor__preview"
          value={value}
          preventRender={!isLarge && mode !== "view"}
        />
      </div>
    </div>
  );
}
