import { LinkProps, useNavigate } from "react-router-dom";
import { scrollToAsync } from "../animation/scroll";

export default function SLink({
  className,
  to,
  children,
}: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
  const target = typeof to === "string" ? to : to.pathname;
  const navigate = useNavigate();

  return (
    <a
      href={target}
      onClick={async (event) => {
        event.preventDefault();

        await scrollToAsync(0, 250);

        navigate(to, {
          state: {
            fromLink: true,
          },
        });
      }}
      className={className}
    >
      {children}
    </a>
  );
}
