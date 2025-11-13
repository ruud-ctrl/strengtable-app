import getTheme from "./theme";

export function useTheme() {
  // const theme = useColorScheme() || "dark";
  const theme = "dark";
  const colors = getTheme[theme] || getTheme.light; // fallback to light
  return { colors, theme };
}