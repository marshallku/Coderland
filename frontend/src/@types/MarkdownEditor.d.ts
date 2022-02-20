interface IMarkdownEditorProps {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

declare type TEditorMode = "edit" | "view";
