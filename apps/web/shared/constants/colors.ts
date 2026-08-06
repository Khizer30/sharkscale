export const colors = {
  primary: "#170149",
  secondary: "#ffd21f",
  tertiary: "#12003a",
  white: "#ffffff",
  black: "#000000"
} as const;

export type ColorName = keyof typeof colors;
