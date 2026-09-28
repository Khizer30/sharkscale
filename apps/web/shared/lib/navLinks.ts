export interface NavLink {
  label: string;
  sectionId: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", sectionId: "home" },
  { label: "What We Do", sectionId: "what-we-do" },
  { label: "Reviews", sectionId: "reviews" }
];
