import type { MouseEvent } from "react";

export const BOOK_SECTION_ID = "book-a-call";

export function scrollToSection(sectionId: string): boolean {
  const el = document.getElementById(sectionId);
  if (!el) {
    return false;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

/** Scroll to a section id; retries while lazy chunks mount. Updates the URL hash. */
export function navigateToSection(sectionId: string): void {
  const commitHash = () => {
    const hash = `#${sectionId}`;
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash);
    }
  };

  if (scrollToSection(sectionId)) {
    commitHash();
    return;
  }

  let attempts = 0;
  const maxAttempts = 180;

  const tick = () => {
    if (scrollToSection(sectionId)) {
      commitHash();
      return;
    }
    attempts += 1;
    if (attempts < maxAttempts) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
}

export function handleSectionNavClick(sectionId: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateToSection(sectionId);
  };
}
