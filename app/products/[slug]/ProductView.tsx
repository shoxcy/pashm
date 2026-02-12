"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/pashm-navbar/Navbar";
import { BiShare } from "react-icons/bi";
import { BsShareFill } from "react-icons/bs";

type Product = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  images: string[];
  reviews: number;
  rating: number; // 0..5
  description: string;
  productDetails: string;
  usage: string;
  warnings: string;
};

const RECOMMENDED_PRODUCTS = [
  {
    id: "1",
    title: "Shilajit",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: 6500,
    image: "/assets/products/shilajit.png",
  },
  {
    id: "2",
    title: "Saron Oil",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: 4500,
    image: "/assets/products/saronoil.png",
  },
  {
    id: "3",
    title: "Class Dry Fruits",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: 5000,
    image: "/assets/products/dryfruits.png",
  },
];

function formatINR(n: number) {
  return `RS. ${n.toLocaleString("en-IN")}`;
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  const safe = Math.max(0, Math.min(5, rating));
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-[2px] text-[25px] leading-none">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= safe ? "text-[#C9A24A]" : "text-[#C9A24A]/25"}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-[18px] text-[#2E3A43]/55">| {reviews} reviews</span>
    </div>
  );
}

function BlueButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      style={{ backgroundImage: "url('/assets/blue-button.png')" }}
      className="relative w-full rounded-[2px] bg-[#12385C] hover:bg-[#12385C]/92 bg-blend-multiply py-3 text-[15px] text-white transition-colors"
    >
      {children}
      <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20" />
    </button>
  );
}

function GoldButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      style={{ backgroundImage: "url('/assets/buttonimage.png')" }}
      className="w-full rounded-[2px] bg-[#E1C882] hover:bg-[#E1C882]/90 bg-blend-multiply py-3 text-[15px] text-[#0E1822FF] transition-colors"
    >
      {children}
    </button>
  );
}

function ShareButton() {
  return (
    <button
      type="button"
      aria-label="Share"
      className="inline-flex h-15 w-15 items-center justify-center rounded-full transition-colors"
    >
      <BsShareFill size={18}/>
    </button>
  );
}

function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/10">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-[13px] font-semibold text-[#1A2D3A] uppercase">
          {title}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-[11px] leading-relaxed text-[#2E3A43]/80">
          {children}
        </div>
      </div>
    </div>
  );
}

import { useCart } from "../../../context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductView({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const images = useMemo(
    () => (product?.images?.length ? product.images : []),
    [product]
  );

  const decrementQty = () => setQuantity((q) => Math.max(1, q - 1));
  const incrementQty = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
    }, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <section className="min-h-screen w-full bg-[#F6F1E6]">
      <Navbar />

      <div className="mx-auto w-full max-w-[1180px] px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-36">
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[11px] text-[#2E3A43]/65 hover:text-[#12385C] mt-6 mb-10 transition-colors underline underline-offset-4 decoration-[#2E3A43]/30 hover:decoration-[#12385C]"
          >
            Go Back to Shop
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <div className="flex flex-col-reverse gap-6 sm:flex-row sm:gap-6">
              <div className="flex flex-row gap-4 sm:flex-col sm:gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={[
                      "relative h-16 w-16 sm:h-20 sm:w-20 rounded-[2px] overflow-hidden transition-all",
                      "bg-white/20",
                      selectedImage === idx
                        ? "ring-2 ring-[#12385C]"
                        : "ring-1 ring-black/5 hover:ring-black/10",
                    ].join(" ")}
                    aria-label={`Select image ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>

              <div className="relative w-full overflow-hidden rounded-[2px] bg-transparent shadow-none">
                <div className="relative aspect-square w-full overflow-hidden rounded-[2px]">
                  <Image
                    src={images[selectedImage] || images[0]}
                    alt={product.title}
                    fill
                    priority
                    className="object-contain" 
                    sizes="(min-width: 1024px) 600px, 100vw"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <StarRating rating={product.rating} reviews={product.reviews} />
            </div>

            <div className="mt-6 space-y-5 text-[13px] leading-relaxed text-[#2E3A43]/85">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0 flex-1">
                <h1 className="font-serif text-[40px] md:text-[52px] leading-[1.06] text-[#12385C]">
                  {product.title}
                </h1>
                <p className="mt-2 text-[15px] text-[#2E3A43]/90">
                  {product.subtitle}
                </p>
              </div>
              <ShareButton />
            </div>

            <div className="mt-6 text-[30px] font-light text-[#1A2D3A]">
              {formatINR(product.price)}
            </div>

            <div className="mt-10">
              <div className="mb-3 text-[13px] font-bold text-[#1A2D3A] uppercase">
                QUANTITY
              </div>

              <div className="flex items-center gap-8 text-[#1A2D3A]">
                <button
                  type="button"
                  onClick={decrementQty}
                  className="text-[18px] hover:opacity-60 transition-opacity"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span className="w-6 text-center text-[16px]">{quantity}</span>

                <button
                  type="button"
                  onClick={incrementQty}
                  className="text-[18px] hover:opacity-60 transition-opacity"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <div onClick={handleBuyNow}>
                <BlueButton>Buy Now</BlueButton>
              </div>
              <div onClick={handleAddToCart}>
                <GoldButton>Add to Cart</GoldButton>
              </div>
            </div>

            <div className="mt-10 space-y-1">
              <Accordion title="PRODUCT DETAILS">{product.productDetails}</Accordion>
              <Accordion title="USAGE">{product.usage}</Accordion>
              <Accordion title="DELIVERY & RETURNS">{product.warnings}</Accordion>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-[18px] font-medium tracking-[0.05em] text-[#2E3A43]/60">
              You may also like
            </h2>
            <div className="flex items-center gap-6">
              <button
                onClick={() => {
                  const el = document.getElementById("recommended-scroll");
                  if (el) el.scrollBy({ left: -300, behavior: "smooth" });
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 hover:bg-black/5 transition-colors"
                aria-label="Scroll left"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("recommended-scroll");
                  if (el) el.scrollBy({ left: 300, behavior: "smooth" });
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 hover:bg-black/5 transition-colors"
                aria-label="Scroll right"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div
            id="recommended-scroll"
            className="flex gap-x-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {RECOMMENDED_PRODUCTS.map((item) => (
              <article
                key={item.id}
                className="min-w-[260px] sm:min-w-[320px] lg:min-w-[calc(33.333%-16px)] snap-start flex cursor-pointer flex-col items-center text-center group"
              >
                <div className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain drop-shadow-sm"
                  />
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col items-center space-y-1 sm:space-y-2">
                  <h3 className="font-serif text-[18px] sm:text-[22px] leading-snug text-[#1A2D3A]">
                    {item.title}
                  </h3>

                  <p className="max-w-[200px] sm:max-w-[240px] text-[11px] sm:text-[12px] leading-relaxed text-[#2E3A43]/70">
                    {item.subtitle}
                  </p>

                  <div className="pt-1 sm:pt-2 text-[14px] sm:text-[16px] font-medium tracking-wide text-[#1A2D3A]">
                    {formatINR(item.price)}
                  </div>
                </div>

                <div 
                  className="mt-5 sm:mt-6 w-full max-w-[240px] sm:max-w-[280px]"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      image: item.image,
                      slug: item.id === "1" ? "shilajit" : item.id === "2" ? "saffron-oil" : "dry-fruits",
                    });
                  }}
                >
                  <BlueButton>Add to Cart</BlueButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
