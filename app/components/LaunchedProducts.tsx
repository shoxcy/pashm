"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  badge?: "BEST SELLER" | "JUST LAUNCHED";
  imageSrc: string;
};

const PRODUCTS: Product[] = [
  {
    id: "shilajit",
    name: "Lorem Ipsum Dolor Sitare",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: 6500,
    badge: "BEST SELLER",
    imageSrc: "/assets/products/shilajit.png",
  },
  {
    id: "saffron",
    name: "Sed Yt Perspiciatis Unde",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: 4500,
    badge: "JUST LAUNCHED",
    imageSrc: "/assets/products/saronoil.png",
  },
  {
    id: "dried-fruit",
    name: "At Cero Eos Eterius",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: 5000,
    badge: "JUST LAUNCHED",
    imageSrc: "/assets/products/dryfruits.png",
  },
];

function formatINR(n: number) {
  return `RS. ${n.toLocaleString("en-IN")}`;
}

function shuffleDifferent<T>(arr: T[], prev: T[]) {
  const sameOrder = (a: T[], b: T[]) =>
    a.length === b.length && a.every((v, i) => v === b[i]);

  let attempt = 0;
  let next = [...arr];

  while (attempt < 8) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    next = a;
    if (!sameOrder(next, prev)) break;
    attempt++;
  }
  return next;
}

export default function LauncedProducts() {
  const [order, setOrder] = useState<Product[]>(PRODUCTS);
  const [activeDot, setActiveDot] = useState(0);

  const onShuffle = () => {
    setOrder((prev) => shuffleDifferent(PRODUCTS, prev));
    setActiveDot((d) => (d + 1) % 4);
  };

  const dots = useMemo(() => Array.from({ length: 4 }), []);

  return (
    <section className="w-full bg-[#F6F1E6] pt-0 md:pt-10 overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-left sm:text-center">
          <h2 className="text-[#12385C] type-h2-d">Lorem &amp; Ipsum</h2>
          <p className="mt-3 max-w-xl type-body-1-d leading-relaxed text-[#2E3A43]/80 sm:mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            fugiat est quasi quibusdam aliquam tempore.
          </p>
        </div>

        <div className="relative mt-10">
          <button
            type="button"
            onClick={onShuffle}
            aria-label="Previous"
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/70 p-2 shadow-sm backdrop-blur transition hover:bg-white sm:flex"
          >
            <FiChevronLeft className="h-5 w-5 text-[#143046]" />
          </button>

          <button
            type="button"
            onClick={onShuffle}
            aria-label="Next"
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/70 p-2 shadow-sm backdrop-blur transition hover:bg-white sm:flex"
          >
            <FiChevronRight className="h-5 w-5 text-[#143046]" />
          </button>
          <div className="sm:hidden">
            <div className="grid grid-cols-2 gap-x-20 gap-y-10 pt-8">
              {order.slice(0, 2).map((p) => (
                <article
                  key={p.id}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative h-30 w-30 md:h-110 md:w-110">
                    <Image
                      src={p.imageSrc}
                      alt={p.name}
                      width={1000000000000}
                      height={100000000000}
                    />
                  </div>
                  <h3 className="mt-5 font-serif text-[16px] leading-snug text-[#1A2D3A]">
                    {p.name}
                  </h3>
                  <p className="mt-2 max-w-[160px] text-[11px] leading-relaxed text-[#2E3A43]/80">
                    {p.desc}
                  </p>
                  <div className="mt-4 text-[13px] tracking-wide text-[#1A2D3A]">
                    {formatINR(p.price)}
                  </div>
                  <div className="mt-4 w-full">
                    <button
                      type="button"
                      style={{
                        backgroundImage: "url('/assets/blue-button.png')",
                      }}
                      className="relative w-full bg-[#12385C] bg-blend-multiply py-2 type-button-1-d-blue-button text-white"
                    >
                      Add to Cart

                      {p.badge && (
                        <span className="absolute right-0 top-0 z-20 bg-[#CEBB84] px-2 py-[3px] text-[7px] font-bold uppercase tracking-widest text-[#12385C]">
                          {p.badge}
                        </span>
                      )}
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between px-2">
              <button
                type="button"
                onClick={onShuffle}
                aria-label="Previous (mobile)"
                className="p-2"
              >
                <FiChevronLeft className="h-5 w-5 text-[#143046]/70" />
              </button>

              <div className="flex items-center justify-center gap-3">
                {dots.map((_, i) => (
                  <span
                    key={i}
                    className={[
                      "h-[3px] w-10 rounded-full transition",
                      i === activeDot ? "bg-[#1A2D3A]" : "bg-[#1A2D3A]/15",
                    ].join(" ")}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={onShuffle}
                aria-label="Next (mobile)"
                className="p-2"
              >
                <FiChevronRight className="h-5 w-5 text-[#143046]/70" />
              </button>
            </div>
          </div>

          {/* =========================
              TABLET/DESKTOP: 3 COLUMN GRID
             ========================= */}
          <div className="hidden sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:px-10">
            {order.map((p) => (
              <article
                key={p.id}
                className="flex flex-col items-center text-center"
              >
                <div className="relative h-56 w-56 lg:h-72 lg:w-72 flex items-center justify-center">
                  <Image
                    src={p.imageSrc}
                    alt={p.name}
                    fill
                    className={`object-contain drop-shadow-sm ${
                      p.id === "dried-fruit"
                        ? "scale-[0.65] lg:scale-[0.6]"
                        : "scale-100"
                    }`}
                    sizes="(max-width: 1024px) 224px, 288px"
                  />
                </div>

                <h3 className="mt-6 font-serif text-lg text-[#1A2D3A]">
                  {p.name}
                </h3>

                <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#2E3A43]/80 sm:text-sm">
                  {p.desc}
                </p>

                <div className="mt-4 text-base tracking-wide text-[#1A2D3A]">
                  {formatINR(p.price)}
                </div>

                <div className="mt-6 w-full max-w-sm">
                  <button
                    type="button"
                    style={{
                      backgroundImage: "url('/assets/blue-button.png')",
                    }}
                    className="relative w-full rounded-[2px] bg-[#12385C] bg-blend-multiply py-3 text-[13px] text-white"
                  >
                    Add to Cart

                    {p.badge && (
                      <span className="absolute right-0 top-0 z-20 bg-[#CEBB84] px-2 py-[4px] text-[8px] font-bold uppercase tracking-widest text-[#12385C]">
                        {p.badge}
                      </span>
                    )}

                    <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* OPTIONAL: DOTS ON DESKTOP TOO */}
          <div className="mt-10 hidden sm:flex items-center justify-center gap-3">
            {dots.map((_, i) => (
              <span
                key={i}
                className={[
                  "h-[3px] w-10 rounded-full transition",
                  i === activeDot ? "bg-[#1A2D3A]" : "bg-[#1A2D3A]/15",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
