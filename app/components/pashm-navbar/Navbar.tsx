"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsDiscord, BsInstagram, BsSearch, BsTwitterX } from "react-icons/bs";

type NavLink = { label: string; href: string };

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

const MOBILE_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Account", href: "/account" },
];

function IconButton({
  label,
  onClick,
  className = "",
  children,
}: {
  label: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`inline-flex h-10 w-10 items-center justify-center text-black/85 hover:text-black transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // lock scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto w-full max-w-7xl px-5 pt-6 lg:pt-8">
          <nav className="relative flex h-16 lg:h-20 items-center justify-between">
            <div className="flex w-full items-center justify-between lg:hidden">
              <Link href="/" className="relative flex items-center gap-2">
                <div className="relative h-12 w-12">
                  <Image
                    src="/assets/var2logo.svg"
                    alt="PASHM"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </Link>

              <div className="flex items-center gap-1">
                <IconButton label="Search">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M16.5 16.5 21 21"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </IconButton>

                <Link
                  href="/cart"
                  aria-label="Cart"
                  className="inline-flex h-10 w-10 items-center justify-center text-black/85 hover:text-black transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 7h15l-1.5 8.5H7.2L6 7Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 7 5.2 4.8H3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>

                <IconButton label="Open menu" onClick={() => setOpen(true)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </IconButton>
              </div>
            </div>

            {/* DESKTOP NAV (your existing layout) */}
            <div className="hidden lg:block w-full">
              <div className="flex items-center justify-between">
                {/* Left: search */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-[16px] type-h1-d gap-2 text-black/75 hover:text-black transition-colors cursor-pointer group">
                    <BsSearch />
                    <input
                      type="text"
                      placeholder="Search"
                      className="bg-transparent border-b border-[#9e9a90] focus:outline-none placeholder:text-black/40 w-40"
                    />
                  </div>
                </div>

                {/* Center */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="flex items-center gap-12">
                    <div className="flex items-center gap-18 type-h1-d text-black/80">
                      {NAV_LINKS.slice(0, 2).map((l) => (
                        <Link
                          key={l.label}
                          href={l.href}
                          className="hover:text-[#D6C78F] transition-colors"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>

                    <Link href="/" className="block relative">
                      <div className="relative h-28 w-28">
                        <Image
                          src="/assets/var2logo.svg"
                          alt="PASHM"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                    </Link>

                    <div className="flex items-center gap-18 type-h1-d text-black/80">
                      {NAV_LINKS.slice(2).map((l) => (
                        <Link
                          key={l.label}
                          href={l.href}
                          className="hover:text-[#D6C78F] transition-colors"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4 type-h1-d">
                  <div className="flex items-center gap-4 text-black/80 text-[16px] tracking-wide font-medium">
                    <span className="inline-flex items-center gap-2 hover:text-black transition-colors cursor-pointer">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M6 7h15l-1.5 8.5H7.2L6 7Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 7 5.2 4.8H3"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                          fill="currentColor"
                        />
                      </svg>
                      <Link href="/cart">Cart</Link>
                    </span>

                    <span className="text-black/30 font-light">|</span>

                    <span className="inline-flex items-center gap-2 hover:text-black transition-colors cursor-pointer">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <path
                          d="M20 20a8 8 0 0 0-16 0"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                      <Link href="/account">Account</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[999]">
          <div className="absolute inset-0 bg-black/65" />

          <div className="absolute inset-x-0 top-0 flex justify-center">
            <div className="w-full bg-[#f8f5f1] shadow-2xl h-1/2 flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-black/15 bg-white/40">
                <div className="flex items-center gap-3">
                  <div className="relative h-15 w-15">
                    <Image
                      src="/assets/var2logo.svg"
                      alt="PASHM"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-black/75">
                  <button
                    type="button"
                    aria-label="Search"
                    className="inline-flex h-10 w-10 items-center justify-center hover:text-black transition-colors"
                  >
                    <BsSearch size={18} />
                  </button>

                  <Link
                    href="/cart"
                    aria-label="Cart"
                    className="inline-flex h-10 w-10 items-center justify-center hover:text-black transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 7h15l-1.5 8.5H7.2L6 7Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 7 5.2 4.8H3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Link>

                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center hover:text-black transition-colors"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-auto">
                {MOBILE_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="block px-6 py-4 text-[15px] font-medium type-h1-d border-b border-black/15 text-black/75"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              {/* Footer icons */}
              <div className="px-6 py-4 flex items-center gap-6 border-t border-black/15 bg-[#f8f5f1]">
                <a
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center text-black/70 hover:text-black transition-colors"
                  aria-label="Instagram"
                >
                  <BsInstagram size={20} />
                </a>
                <a
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center text-black/70 hover:text-black transition-colors"
                  aria-label="X"
                >
                  <BsTwitterX size={20} />
                </a>
                <a
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center text-black/70 hover:text-black transition-colors"
                  aria-label="Discord"
                >
                  <BsDiscord size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* prevent clicks anywhere else */}
          <button
            aria-label="Close menu backdrop"
            className="absolute inset-0 cursor-default"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </>
  );
}
