import logo from "@shared/assets/logo.webp";
import { navLinks } from "@shared/lib/navLinks";
import { cn } from "@shared/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const homeHref = navLinks.find((link) => link.label === "Home")?.href ?? "#";
  const contactHref = navLinks.find((link) => link.label === "Contact Us")?.href ?? "#";

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href={homeHref} className="flex items-center">
          <Image src={logo} alt="SharkScale" priority draggable={false} className="h-24 w-auto" />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm font-medium text-tertiary-foreground/80 transition-colors hover:text-tertiary-foreground">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={contactHref}
          className={cn(
            "inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold",
            "bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/90"
          )}
        >
          Book a Call
        </Link>
      </nav>
    </header>
  );
}
