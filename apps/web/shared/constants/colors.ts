export const colors = {
  primary: "#170149",
  secondary: "#ffd21f",
  tertiary: "#12003a",
  white: "#ffffff",
  black: "#000000",
  cream: "#f5f0e8",
  bgFooter: "#0a0020"
} as const;

export type ColorName = keyof typeof colors;
