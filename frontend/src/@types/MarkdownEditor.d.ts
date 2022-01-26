interface MarkdownEditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

declare type EditorMode = "edit" | "view";
