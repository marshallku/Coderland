declare type TTheme = "light" | "dark";

interface ITheme {
  updateTheme: () => void;
  theme: TTheme;
}
