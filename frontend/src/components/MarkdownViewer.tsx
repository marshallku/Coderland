import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import RehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  solarizedlight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "../hooks/theme";
import formatClassName from "../utils/formatClassName";
import { isFromSameOrigin } from "../utils/url";
import "./MarkdownViewer.css";
import parseSpecialCharacters from "../utils/parseSpecialCharacters";

const DEFAULT_RATIO = 56.25; // 16:9

export default function MarkdownViewer({
  className,
  value,
  preventRender,
}: IMarkdownViewerProps) {
  if (preventRender) {
    return (
      <div className={formatClassName("markdown-article", className)}>
        마우스를 놓으면 렌더링 될 거에요! 👀
      </div>
    );
  }

  const theme = useTheme();

  return (
    <article className={formatClassName("markdown-article", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[RehypeRaw]}
        components={{
          // eslint-disable-next-line react/no-unstable-nested-components
          h1({ className: childClassName, children }) {
            return (
              <h2
                className={formatClassName(
                  "markdown-article__title",
                  childClassName
                )}
              >
                {children}
              </h2>
            );
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          a({ href, className: childClassName, children }) {
            if (!href) {
              return <span className={childClassName}>{children}</span>;
            }

            if (isFromSameOrigin(href)) {
              const { pathname } = new URL(href);
              return (
                <Link className={childClassName} to={pathname}>
                  {children}
                </Link>
              );
            }

            return (
              <a
                href={href}
                className={childClassName}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children} <i className="icon-launch" />
              </a>
            );
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          code({ inline, className: childClassName, children }) {
            const match = /language-(\w+)/.exec(childClassName || "");

            return !inline && match ? (
              <Prism
                style={theme?.theme === "dark" ? vscDarkPlus : solarizedlight}
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
          // eslint-disable-next-line react/no-unstable-nested-components
          iframe({ src, width, height, title, allow }) {
            const ratio =
              width && height ? (+height / +width) * 100 : DEFAULT_RATIO;

            return (
              <div className="iframe-container">
                <div
                  className="iframe-ratio"
                  style={{
                    paddingBottom: `${ratio}%`,
                  }}
                >
                  <iframe
                    loading="lazy"
                    src={src}
                    width={width}
                    height={height}
                    title={title}
                    allow={allow}
                  />
                </div>
              </div>
            );
          },
        }}
      >
        {parseSpecialCharacters(value ?? "")}
      </ReactMarkdown>
    </article>
  );
}
