type Theme = "dark" | "light";

interface ThemeStore {
  theme?: Theme;
  toggleTheme: () => void;
}
