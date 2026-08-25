export const colors = {
  primary: "#271168",
  secondary: "#ffd21f",
  tertiary: "#1b0a50",
  white: "#ffffff",
  black: "#000000",
  cream: "#f5f0e8",
  bgFooter: "#170941"
} as const;

export type ColorName = keyof typeof colors;
