"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/shopify";
import { useRouter } from "next/navigation";

function formatINR(n: number) {
  return `RS. ${n.toLocaleString("en-IN")}`;
}

function rotate<T>(arr: T[], startIndex: number) {
  if (!arr.length) return [];
  const n = arr.length;
  const i = ((startIndex % n) + n) % n;
  return [...arr.slice(i), ...arr.slice(0, i)];
}

export default function LauncedProducts({ products = [] }: { products?: Product[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const { addToCart } = useCart();
  const router = useRouter();

  // Filter or sort if needed, here we just use the passed products
  // Maybe filter out those without images?
  const displayProducts = useMemo(() => {
    return products.filter(p => p.availableForSale);
  }, [products]);

  const dots = useMemo(() => {
     return Array.from({ length: Math.min(4, displayProducts.length) });
  }, [displayProducts.length]);

  if (displayProducts.length === 0) return null;

  const ordered = rotate(displayProducts, index);

  const onNext = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % displayProducts.length);
  };

  const onPrev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + displayProducts.length) % displayProducts.length);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      filter: "blur(4px)",
    }),
  } as const;

  const handleAddToCart = (p: Product) => {
    const variantId = p.variants.edges[0]?.node.id || p.id;
    const priceAmount = parseFloat(p.priceRange.minVariantPrice.amount);
    const image = p.featuredImage?.url || p.images.edges[0]?.node.url || "";
    
    addToCart({
      id: variantId,
      title: p.title,
      price: priceAmount,
      image: image,
      slug: p.handle
    });
  };

  return (
    <section className="w-full bg-[#F6F1E6] pt-0 md:pt-10 overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-left sm:text-center">
          <h2 className="text-[#12385C] text-5xl">
            Essence & Energy
          </h2>
          <p className="mt-3 max-w-xl type-body-1-d leading-relaxed text-[#2E3A43]/80 sm:mx-auto">
            Discover rare Himalayan ingredients sourced from Kashmir’s valleys, 
            carefully preserved to bring purity, strength, and timeless wellness 
            into your everyday ritual.
          </p>
        </div>
        <div className="relative mt-10">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous"
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full sm:flex p-2"
          >
            <FiChevronLeft className="h-5 w-5 text-[#143046]" />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next"
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full sm:flex p-2"
          >
            <FiChevronRight className="h-5 w-5 text-[#143046]" />
          </button>
          
          <div className="sm:hidden">
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                key={index} // re-animate when index changes
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 gap-x-20 gap-y-10 pt-8 will-change-transform"
              >
                {ordered.slice(0, 2).map((p) => {
                  const imageSrc = p.featuredImage?.url || p.images.edges[0]?.node.url || "";
                  const price = parseFloat(p.priceRange.minVariantPrice.amount);
                  const badge = p.tags.includes("Best Seller") ? "BEST SELLER" : p.tags.includes("New") ? "JUST LAUNCHED" : undefined;
                  
                  return (
                    <article
                      key={p.id}
                      className="flex flex-col items-center text-center"
                    >
                      <Link href={`/products/${p.handle}`} className="cursor-pointer group">
                        <div className="relative h-32 w-32 md:h-40 md:w-40 transition-transform duration-300 group-hover:scale-105">
                          {imageSrc && (
                             <Image
                            src={imageSrc}
                            alt={p.title}
                            fill
                            className="object-contain drop-shadow-sm"
                            sizes="128px"
                          />
                          )}
                        </div>

                        <h3 className="mt-5 font-serif text-[16px] leading-snug text-[#1A2D3A] group-hover:text-[#12385C]">
                          {p.title}
                        </h3>
                      </Link>

                      <p className="mt-2 max-w-[160px] text-[11px] leading-relaxed text-[#2E3A43]/80 line-clamp-2">
                        {p.description}
                      </p>

                      <div className="mt-4 text-[13px] tracking-wide text-[#1A2D3A]">
                        {formatINR(price)}
                      </div>

                      <div className="mt-4 w-full">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(p)}
                          style={{
                            backgroundImage: "url('/assets/blue-button.png')",
                          }}
                          className="relative w-full bg-[#12385C] bg-blend-multiply hover:bg-[#12385C]/90 py-2 type-button-1-d-blue-button text-white"
                        >
                          Add to Cart
                          {badge && (
                            <span className="absolute right-0 top-0 z-20 bg-[#CEBB84] px-2 py-[3px] text-[7px] font-bold uppercase tracking-widest text-[#12385C]">
                              {badge}
                            </span>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
            
            {/* Mobile Nav */}
            <div className="mt-8 flex items-center justify-between px-2">
              <button onClick={onPrev} className="p-2"><FiChevronLeft className="h-5 w-5 text-[#143046]/70" /></button>
              <div className="flex items-center justify-center gap-3">
                {dots.map((_, i) => (
                  <span key={i} className={`h-[3px] w-10 rounded-full transition ${i === (index % dots.length) ? "bg-[#1A2D3A]" : "bg-[#1A2D3A]/15"}`} />
                ))}
              </div>
              <button onClick={onNext} className="p-2"><FiChevronRight className="h-5 w-5 text-[#143046]/70" /></button>
            </div>
          </div>

          <div className="hidden sm:block">
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 will-change-transform"
              >
                {ordered.slice(0, 3).map((p) => {
                  const imageSrc = p.featuredImage?.url || p.images.edges[0]?.node.url || "";
                  const price = parseFloat(p.priceRange.minVariantPrice.amount);
                  const badge = p.tags.includes("Best Seller") ? "BEST SELLER" : p.tags.includes("New") ? "JUST LAUNCHED" : undefined;
                  
                  return (
                    <article
                      key={p.id}
                      className="flex flex-col items-center text-center"
                    >
                      <Link href={`/products/${p.handle}`} className="cursor-pointer group">
                        <div className="relative h-56 w-56 lg:h-72 lg:w-72  flex items-center justify-center">
                          {imageSrc && (
                            <Image
                              src={imageSrc}
                              alt={p.title}
                              fill
                              className="object-contain drop-shadow-sm"
                              sizes="(max-width: 1024px) 224px, 288px"
                            />
                          )}
                        </div>

                        <h3 className="mt-6 font-serif text-lg text-[#1A2D3A] group-hover:text-[#12385C]">
                          {p.title}
                        </h3>
                      </Link>

                      <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#2E3A43]/80 sm:text-sm line-clamp-2">
                        {p.description}
                      </p>

                      <div className="mt-4 text-base tracking-wide text-[#1A2D3A]">
                        {formatINR(price)}
                      </div>

                      <div className="mt-6 w-full max-w-sm">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(p)}
                          style={{
                            backgroundImage: "url('/assets/blue-button.png')",
                          }}
                          className="relative w-full rounded-[2px] bg-[#12385C] hover:bg-[#12385C]/90 bg-blend-multiply py-3 text-[13px] text-white"
                        >
                          Add to Cart
                          {badge && (
                            <span className="absolute right-0 top-0 z-20 bg-[#CEBB84] px-2 py-[4px] text-[8px] font-bold uppercase tracking-widest text-[#12385C]">
                              {badge}
                            </span>
                          )}
                           <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 hidden sm:flex items-center justify-center gap-3">
              {dots.map((_, i) => (
                <span key={i} className={`h-[3px] w-10 rounded-full transition ${i === (index % dots.length) ? "bg-[#1A2D3A]" : "bg-[#1A2D3A]/15"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
