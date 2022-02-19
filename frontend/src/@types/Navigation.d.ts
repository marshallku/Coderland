interface INavigationItems {
  title: string;
  to: string;
}

interface INavigationProps {
  list: Array<INavigationItems>;
  align?: "center" | "left" | "right";
}
