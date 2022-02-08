import { createContext, useContext, useState } from "react";

const THEME = "theme";

function getCurrentTheme(): TTheme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getNextTheme(): TTheme {
  return document.documentElement.classList.contains("dark") ? "light" : "dark";
}

function saveTheme(themeToSave: TTheme) {
  localStorage.setItem(THEME, themeToSave);
}

const themeContext = createContext<ITheme | null>(null);

function useThemeProvider() {
  const [theme, setTheme] = useState<TTheme>(getCurrentTheme());

  return {
    updateTheme: () => {
      const nextTheme = getNextTheme();

      document.documentElement.className = nextTheme;
      setTheme(nextTheme);
      saveTheme(nextTheme);
    },
    theme,
  };
}

export function useTheme() {
  return useContext(themeContext);
}

export function ThemeProvider({ children }: { children: JSX.Element }) {
  const theme = useThemeProvider();

  return (
    <themeContext.Provider value={theme}>{children}</themeContext.Provider>
  );
}
