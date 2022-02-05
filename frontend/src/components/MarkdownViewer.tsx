import ReactMarkdown from "react-markdown";
import RehypeRaw from "rehype-raw";
import RehypeSanitize from "rehype-sanitize";

export default function MarkdownViewer({
  className,
  value,
}: IMarkdownViewerProps) {
  return (
    <ReactMarkdown
      className={className || ""}
      rehypePlugins={[RehypeRaw, RehypeSanitize]}
      components={{
        h1: "h2",
      }}
    >
      {value ?? ""}
    </ReactMarkdown>
  );
}
