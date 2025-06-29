"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/60 border-b border-black/5">
      <div className="mx-auto max-w-6xl px-6 flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-black tracking-tight">
          N360
        </Link>
        <nav className="flex gap-8 text-sm font-medium">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link key={href} href={href} className="relative flex flex-col items-center hover:opacity-70 transition-opacity">
                {label}
                {active && <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-accent" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
} 