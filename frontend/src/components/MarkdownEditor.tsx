import { useCallback, useEffect, useState } from "react";
import MarkdownViewer from "./MarkdownViewer";
import { Textarea } from "./Input";
import { debounce } from "../utils/optimizer";
import "./MarkdownEditor.css";

export default function MarkdownEditor({
  id,
  label,
  name,
  value,
  setValue,
}: IMarkdownEditorProps) {
  const [mode, setMode] = useState<TEditorMode>("edit");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const highlight = (target: TEditorMode) =>
    target === mode ? "highlight" : "";

  const Editor = (
    <Textarea
      id={id || "markdown-content"}
      className="markdown-editor__textarea"
      name={name}
      label={label || "내용을 입력해주세요. (마크다운 지원)"}
      hideLabelOnFocus
      value={value}
      setValue={setValue}
    />
  );

  const Viewer = (
    <MarkdownViewer className="markdown-editor__preview" value={value} />
  );

  const Content = useCallback(() => {
    if (screenWidth >= 860) {
      return (
        <>
          {Editor}
          {Viewer}
        </>
      );
    }

    return mode === "edit" ? Editor : Viewer;
  }, [value, screenWidth, mode]);

  useEffect(() => {
    const update = debounce(() => {
      setScreenWidth(window.innerWidth);
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
      <div className="markdown-editor__container">{Content()}</div>
    </div>
  );
}
