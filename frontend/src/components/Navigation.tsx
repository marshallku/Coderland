import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./Navigation.css";

function CustomLink({ title, to }: NavigationItems) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      className={`navigation__item${
        match ? " navigation__item--highlight" : ""
      }`}
    >
      {title}
    </Link>
  );
}

export default function Navigation({ list, align = "left" }: NavigationProps) {
  return (
    <nav className={`navigation navigation--align-${align}`}>
      {list.map(({ title, to }) => (
        <CustomLink key={title} title={title} to={to} />
      ))}
    </nav>
  );
}
