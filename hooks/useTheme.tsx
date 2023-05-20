import { ColorScheme } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorTheme = (value?: ColorScheme) => setTheme(value || (theme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorTheme()]]);

  return { theme, toggleColorTheme };
};
