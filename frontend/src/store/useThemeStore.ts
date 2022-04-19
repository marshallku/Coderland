import create from "zustand";

const useThemeStore = create<ThemeStore>((set) => ({
  theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
  toggleTheme: () => {
    set((x) => {
      const nextTheme = x.theme === "dark" ? "light" : "dark";

      document.documentElement.className = nextTheme;
      localStorage.setItem("theme", nextTheme);

      return { ...x, theme: nextTheme };
    });
  },
}));

export default useThemeStore;
