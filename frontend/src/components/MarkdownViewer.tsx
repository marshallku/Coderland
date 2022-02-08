import ReactMarkdown from "react-markdown";
import RehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { Prism } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  solarizedlight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "../hooks/theme";

export default function MarkdownViewer({
  className,
  value,
}: IMarkdownViewerProps) {
  const theme = useTheme();
  const sanitize = () =>
    rehypeSanitize({
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        code: [...(defaultSchema?.attributes?.code || []), ["className"]],
      },
    });

  return (
    <ReactMarkdown
      className={className || ""}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[RehypeRaw, sanitize]}
      components={{
        h1: "h2",
        // eslint-disable-next-line react/no-unstable-nested-components
        code({ inline, className: childClassName, children }) {
          const match = /language-(\w+)/.exec(childClassName || "");

          return !inline && match ? (
            <Prism
              style={
                // TODO: theme 상태관리 추가해 리렌더링
                theme?.theme === "dark" ? vscDarkPlus : solarizedlight
              }
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </Prism>
          ) : (
            <code className={childClassName} data-tmp={`${inline}`}>
              {children}
            </code>
          );
        },
      }}
    >
      {value ?? ""}
    </ReactMarkdown>
  );
}
