interface NavigationItems {
  title: string;
  to: string;
}

interface NavigationProps {
  list: Array<NavigationItems>;
  align?: "center" | "left" | "right";
}
