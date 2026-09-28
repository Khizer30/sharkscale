import { BOOK_SECTION_ID } from "@shared/lib/scrollToSection";
import { navLinks } from "@shared/lib/navLinks";

export const footerContent = {
  navLinks,
  connectLinks: [{ label: "Contact Us", sectionId: BOOK_SECTION_ID }],
  legalLinks: [] as { label: string; href: string }[],
  tagline: "Email & retention marketing, built to scale",
  copyright: `© ${new Date().getFullYear()} SharkScale. All rights reserved.`
};
