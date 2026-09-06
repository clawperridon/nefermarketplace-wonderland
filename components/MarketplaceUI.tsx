"use client";

import Link from "next/link";
import { Sphere } from "./Sphere";
import { useCart } from "@/lib/cart";

const NAV_ITEMS = [
  { label: "Discover", href: "/" },
  { label: "Designers", href: "/designers" },
  { label: "Feed", href: "/feed" },
  { label: "Atelier", href: "/atelier" },
];

type MkNavProps = {
  active?: string;
};

export function MkNav({ active = "discover" }: MkNavProps) {
  const { count } = useCart();

  return (
    <nav className="mk-nav">
      <div className="nav-group">
        {NAV_ITEMS.map((it) => (
          <Link
            key={it.label}
            href={it.href}
            className={active === it.label.toLowerCase() ? "active" : ""}
          >
            {it.label}
          </Link>
        ))}
      </div>
      <Link href="/" className="nav-logo">
        nefer<span className="dot"></span>
      </Link>
      <div className="nav-group right">
        <Link href="/search">Search</Link>
        <Link href="/account">Account</Link>
        <Link href="/bag" className="bag">
          Bag · {String(count).padStart(2, "0")}
        </Link>
      </div>
    </nav>
  );
}

export function SmallSphere({ size = 44 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, display: "inline-block" }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
          <radialGradient id={`sp-${size}-a`} cx="36%" cy="30%" r="78%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="22%" stopColor="#f1f4f8" />
            <stop offset="55%" stopColor="#c5cbd3" />
            <stop offset="86%" stopColor="#4a525c" />
            <stop offset="100%" stopColor="#1a1f26" />
          </radialGradient>
          <linearGradient id={`sp-${size}-h`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="48%" stopColor="#c5cbd3" />
            <stop offset="50%" stopColor="#4a525c" />
            <stop offset="100%" stopColor="#2a2f36" />
          </linearGradient>
          <clipPath id={`sp-${size}-c`}>
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>
        <circle cx="50" cy="50" r="46" fill={`url(#sp-${size}-a)`} />
        <g clipPath={`url(#sp-${size}-c)`}>
          <rect x="-10" y="3" width="120" height="94" fill={`url(#sp-${size}-h)`} opacity="0.7" />
          <rect x="-10" y="48.5" width="120" height="0.6" fill="#fff" opacity="0.6" />
        </g>
        <ellipse cx="36" cy="32" rx="13" ry="7" fill="#ffffff" opacity="0.65" />
        <ellipse cx="32" cy="28" rx="5" ry="2.5" fill="#ffffff" opacity="0.95" />
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export function HeroSphere({ size = 360 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }}>
      <Sphere size={size} hue="warm" speed={48} />
    </div>
  );
}
