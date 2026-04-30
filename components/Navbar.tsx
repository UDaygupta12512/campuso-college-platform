"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/", label: "Explore", icon: "🔍" },
  { href: "/compare", label: "Compare", icon: "⚖️" },
  { href: "/predictor", label: "Predictor", icon: "🧠" },
  { href: "/qa", label: "Q&A", icon: "💬" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#0a0a0f]/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/8" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-white font-black text-sm">C</span>
          </div>
          <span className="font-black text-white text-base tracking-tight">Campuso</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive(l.href)
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/6"
              }`}>
              <span>{l.icon}</span>{l.label}
            </Link>
          ))}
        </div>

        <button onClick={() => setOpen(o => !o)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/8 transition-all"
          aria-label="Toggle menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0d0d14] border-t border-white/8 px-4 py-3 space-y-1">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(l.href) ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/6"
              }`}>
              <span>{l.icon}</span>{l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
