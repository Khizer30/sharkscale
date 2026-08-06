"use client";
import logo from "@shared/assets/logo.webp";
import { navLinks } from "@shared/lib/navLinks";
import { cn } from "@shared/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const homeHref = navLinks.find((link) => link.label === "Home")?.href ?? "#";
  const contactHref = navLinks.find((link) => link.label === "Contact Us")?.href ?? "#";

  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href={homeHref} className="flex items-center" onClick={closeMenu}>
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

        <div className="flex items-center gap-3">
          <Link
            href={contactHref}
            className={cn(
              "hidden items-center rounded-full px-5 py-2.5 text-sm font-semibold sm:inline-flex",
              "bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/90"
            )}
          >
            Book a Call
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-md p-2 text-tertiary-foreground transition-colors hover:bg-tertiary-foreground/10 md:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-tertiary-foreground/10 bg-tertiary md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-md px-3 py-2.5 text-base font-medium text-tertiary-foreground/80 transition-colors hover:bg-tertiary-foreground/10 hover:text-tertiary-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href={contactHref}
                onClick={closeMenu}
                className={cn(
                  "inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold",
                  "bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/90"
                )}
              >
                Book a Call
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
