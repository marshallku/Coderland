import { Link, useMatch, useResolvedPath } from "react-router-dom";
import formatClassName from "../utils/formatClassName";
import "./Navigation.css";

function CustomLink({ title, to }: INavigationItems) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      className={formatClassName(
        "navigation__item",
        match && "navigation__item--highlight"
      )}
    >
      {title}
    </Link>
  );
}

export default function Navigation({ list, align = "left" }: INavigationProps) {
  return (
    <nav className={`navigation navigation--align-${align}`}>
      {list.map(({ title, to }) => (
        <CustomLink key={title} title={title} to={to} />
      ))}
    </nav>
  );
}
