import ReactMarkdown from "react-markdown";
import RehypeRaw from "rehype-raw";
import RehypeSanitize from "rehype-sanitize";

export default function MarkdownViewer(props: MarkdownViewerProps) {
  return (
    <ReactMarkdown
      className="markdown-editor__preview"
      rehypePlugins={[RehypeRaw, RehypeSanitize]}
      components={{
        h1: "h2",
      }}
      children={props.value}
    />
  );
}
