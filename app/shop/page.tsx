"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/pashm-navbar/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { medusa } from "../../lib/medusa";
import { mapProductToFlat, type FlatProduct } from "../../lib/map-product";

type TabKey = "new" | "best" | "category" | "filters";

function formatINR(priceString: string) {
  // Already formatted from mapper, just return it
  return priceString;
}

function StarRow({ rating = 5, reviewsCount = 0 }: { rating?: number; reviewsCount?: number }) {
  const safeRating = Math.max(0, Math.min(5, rating));
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-[2px] text-[19px] text-[#C9A24A]">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= safeRating ? "text-[#C9A24A]" : "text-[#C9A24A]/40"}>
            ★
          </span>
        ))}
      </div>
      <span className="text-[13px] text-[#2E3A43]/55">| {reviewsCount} reviews</span>
    </div>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-7 rounded-[2px] px-15 text-[13px] tracking-wide ring-1 transition",
        active
          ? "bg-transparent text-[#2E3A43]/70 ring-[#2E3A43]/20 hover:ring-[#2E3A43]/35"
          : "bg-transparent text-[#2E3A43]/70 ring-[#2E3A43]/20 hover:ring-[#2E3A43]/35",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function BlueButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      style={{ backgroundImage: "url('/assets/blue-button.png')" }}
      className="relative w-full rounded-[2px] bg-[#12385C] hover:bg-[#12385C]/90 bg-blend-multiply text-[13px]! md:text-[15px]! tracking-wide py-2 type-button-1-d-blue-button text-white"
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
      className="w-full bg-[#E1C882] hover:bg-[#E1C882]/90 bg-blend-multiply text-[#0E1822FF] text-[11px]! md:text-[13px]! md:text-[15px]! pt-[7px] pb-[7px] pr-[54px] pl-[54px] type-button-1-d tracking-wide"
    >
      {children}
    </button>
  );
}

import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

function ProductCard({
  id,
  title,
  price,
  img,
  slug,
  rating,
  reviewsCount
}: {
  id: string;
  title: string;
  price: string;
  img: string;
  slug: string;
  rating: number;
  reviewsCount: number;
}) {
  const { addToCart } = useCart();
  const router = useRouter();

  // Parse price back to number for cart
  const priceNumber = parseInt(price.replace(/[^0-9]/g, "")) || 0;

  const handleAddToCart = () => {
    addToCart({
      id,
      slug,
      title,
      price: priceNumber,
      image: img,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <article className="w-full">
      <Link href={`/products/${slug}`}>
        <div className="flex h-[150px] w-full items-center justify-center cursor-pointer group">
          <div className="relative h-[210px] w-[210px] md:h-[220px] md:w-[220px]">
            <Image
              src={img}
              alt={title}
              fill
              className="object-contain drop-shadow-sm"
            />
          </div>
        </div>
      </Link>

      <div className="mt-12 space-y-2">
        <StarRow rating={rating} reviewsCount={reviewsCount} />

        <div className="space-y-[6px]">
          <Link href={`/products/${slug}`}>
            <h3 className="text-[24px] leading-snug text-[#1A2D3A] hover:text-[#12385C] transition-colors cursor-pointer">
              {title}
            </h3>
          </Link>
          <div className="text-[14px] tracking-wide text-[#1A2D3A]">
            {formatINR(price)}
          </div>
        </div>

        <div className="space-y-2 pt-3">
          <div onClick={handleAddToCart}>
            <BlueButton>Add to Cart</BlueButton>
          </div>
          <div onClick={handleBuyNow}>
            <GoldButton>Buy Now</GoldButton>
          </div>
        </div>
      </div>
    </article>
  );
}

function Pagination() {
  const pages = [1, 2, 3, 4, 5];

  return (
    <div className="mt-20 flex items-center justify-center gap-2">
      {pages.map((p) => {
        const active = p === 1;
        return (
          <button
            key={p}
            type="button"
            className={[
              "h-12 w-12 rounded-[2px] text-[15px] transition",
              active
                ? "bg-[#12385C] text-white"
                : "bg-transparent text-[#2E3A43]/70 border border-dashed border-[#2E3A43]/35",
            ].join(" ")}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}

function FiltersDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [catOpen, setCatOpen] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [loremOpen, setLoremOpen] = useState(false);

  const [categories, setCategories] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
  });

  const Drawer = (
    <motion.aside
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="fixed right-0 top-0 z-[60] h-[100dvh] w-[92vw] max-w-[420px] bg-[#ffffff] shadow-[0_0_0_1px_rgba(0,0,0,0.04),-12px_0_40px_rgba(0,0,0,0.16)]"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between px-7 pt-7">
          <div className="space-y-1">
            <div className="type-h2-italics-d text-[14px] text-[#1A2D3A]">
              Filter &amp; Sort
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Close filters"
              onClick={onClose}
              className="grid h-8 w-8 pt-4 place-items-center text-[#2E3A43]/70 hover:text-[#2E3A43]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-6 flex-1 overflow-y-auto px-7 pb-8">
          <div className="border-t border-[#2E3A43]/15" />

          <button
            type="button"
            onClick={() => setCatOpen((v) => !v)}
            className="flex w-full items-center justify-between py-5"
          >
            <div className="text-[12px] tracking-wide text-[#1A2D3A]">
              Category
            </div>
            <motion.span
              animate={{ rotate: catOpen ? 180 : 0 }}
              transition={{ duration: 0.18 }}
              className="text-[#2E3A43]/70"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {catOpen ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden pb-5"
              >
                <div className="space-y-3">
                  {[
                    { key: "a", label: "Lorem" },
                    { key: "b", label: "Lorem" },
                    { key: "c", label: "Lorem" },
                    { key: "d", label: "Lorem" },
                  ].map((c) => (
                    <label
                      key={c.key}
                      className="flex items-center gap-3 text-[12px] text-[#2E3A43]/80"
                    >
                      <input
                        type="checkbox"
                        checked={categories[c.key as keyof typeof categories]}
                        onChange={(e) =>
                          setCategories((s) => ({
                            ...s,
                            [c.key]: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 rounded-[2px] border border-[#2E3A43]/35 bg-transparent"
                      />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="border-t border-[#2E3A43]/15" />

          <button
            type="button"
            onClick={() => setSortOpen((v) => !v)}
            className="flex w-full items-center justify-between py-5"
          >
            <div className="text-[12px] tracking-wide text-[#1A2D3A]">
              Sort By
            </div>
            <motion.span
              animate={{ rotate: sortOpen ? 180 : 0 }}
              transition={{ duration: 0.18 }}
              className="text-[#2E3A43]/70"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {sortOpen ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden pb-5"
              >
                <div className="space-y-3 text-[12px] text-[#2E3A43]/80">
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="sort"
                      defaultChecked
                      className="h-4 w-4 border border-[#2E3A43]/35 bg-transparent"
                    />
                    <span>Featured</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="sort"
                      className="h-4 w-4 border border-[#2E3A43]/35 bg-transparent"
                    />
                    <span>Price: Low to High</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="sort"
                      className="h-4 w-4 border border-[#2E3A43]/35 bg-transparent"
                    />
                    <span>Price: High to Low</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="sort"
                      className="h-4 w-4 border border-[#2E3A43]/35 bg-transparent"
                    />
                    <span>Newest</span>
                  </label>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="border-t border-[#2E3A43]/15" />

          <button
            type="button"
            onClick={() => setLoremOpen((v) => !v)}
            className="flex w-full items-center justify-between py-5"
          >
            <div className="text-[12px] tracking-wide text-[#1A2D3A]">
              Lorem ipsum
            </div>
            <motion.span
              animate={{ rotate: loremOpen ? 180 : 0 }}
              transition={{ duration: 0.18 }}
              className="text-[#2E3A43]/70"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {loremOpen ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden pb-5"
              >
                <div className="space-y-3">
                  {["Lorem", "Lorem", "Lorem"].map((t, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 text-[12px] text-[#2E3A43]/80"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded-[2px] border border-[#2E3A43]/35 bg-transparent"
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="border-t border-[#2E3A43]/15 px-7 py-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-11 flex-1 rounded-[2px] border border-dashed border-[#12385C]/45 hover:border-[#12385C]/60 bg-transparent text-[15px] tracking-wide text-[#2E3A43]/70"
            >
              Clear Filters
            </button>

            <button
              type="button"
              style={{ backgroundImage: "url('/assets/blue-button.png')" }}
              className="relative h-11 flex-1 rounded-[2px] bg-[#12385C] hover:bg-[#12385C]/90 bg-blend-multiply text-[15px] tracking-wide text-white"
              onClick={onClose}
            >
              View 50 Products
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20" />
            </button>
          </div>
        </div>
      </div>
    </motion.aside>
  );

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] bg-black/55"
            onClick={onClose}
          />
          {Drawer}
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default function Shop() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<TabKey>("new");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<FlatProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from Medusa on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [productRes, reviewsRes] = await Promise.all([
            medusa.store.product.list({
                limit: 100,
                region_id: "reg_01KHDS81C9AB0RD3XK6GW46M7D",
                fields: "*variants.calculated_price,+variants.prices",
            }),
            fetch("/api/reviews").then(res => res.json())
        ]);

        if (productRes.products) {
          const mapped = productRes.products.map(mapProductToFlat);
          
          if (Array.isArray(reviewsRes)) {
              mapped.forEach(product => {
                  const productReviews = reviewsRes.filter((r: any) => r.productId === product.id);
                  if (productReviews.length > 0) {
                      product.reviewsCount = productReviews.length;
                      const sum = productReviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0);
                      product.rating = sum / productReviews.length;
                  }
              });
          }

          setAllProducts(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query
  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allProducts;
    return allProducts.filter((p) => p.title.toLowerCase().includes(q));
  }, [query, allProducts]);

  return (
    <section className="min-h-screen bg-[#F6F1E6]">
      <Navbar />

      <FiltersDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-40 md:pt-60 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-[30px] text-[#12385C]">Our Products</h1>
          </div>
        </div>

        <div className="mt-4">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-[2px] border border-[#2E3A43]/25 bg-transparent px-4 py-3 text-[12px] text-[#1A2D3A] placeholder:text-[#2E3A43]/40 focus:outline"
            />
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#2E3A43]/45">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21l-4.3-4.3m1.3-5.2a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <TabButton active={tab === "new"} onClick={() => setTab("new")}>
                New Arrivals
              </TabButton>
              <TabButton active={tab === "best"} onClick={() => setTab("best")}>
                Best Sellers
              </TabButton>
              <TabButton active={tab === "category"} onClick={() => setTab("category")}>
                Category
              </TabButton>
              <TabButton
                active={tab === "filters"}
                onClick={() => {
                  setTab("filters");
                  setFiltersOpen(true);
                }}
              >
                All Filters
              </TabButton>
            </div>

            <div className="text-[10px] tracking-wide text-[#2E3A43]/55">
              {products.length} PRODUCTS
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mt-25 grid grid-cols-2 gap-x-10 gap-y-20 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-full animate-pulse">
                <div className="flex h-[150px] w-full items-center justify-center">
                  <div className="h-[210px] w-[210px] md:h-[220px] md:w-[220px] rounded-[2px] bg-[#2E3A43]/10" />
                </div>
                <div className="mt-12 space-y-2">
                  <div className="h-4 w-24 rounded bg-[#2E3A43]/10" />
                  <div className="h-6 w-32 rounded bg-[#2E3A43]/10" />
                  <div className="h-4 w-20 rounded bg-[#2E3A43]/10" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mt-25 flex flex-col items-center justify-center py-20">
            <div className="text-[18px] text-[#2E3A43]/70">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-[2px] bg-[#12385C] px-8 py-3 text-[15px] text-white hover:bg-[#12385C]/90 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="mt-25 flex flex-col items-center justify-center py-20">
            <div className="text-[18px] text-[#2E3A43]/70">
              {query ? "No products found matching your search." : "No products available."}
            </div>
          </div>
        ) : (
          <div className="mt-25 grid grid-cols-2 gap-x-10 gap-y-20 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p, index) => (
              <ProductCard
                key={`${p.id}-${index}`}
                id={p.id}
                title={p.title}
                price={p.price}
                img={p.img}
                slug={p.slug}
                rating={p.rating}
                reviewsCount={p.reviewsCount}
              />
            ))}
          </div>
        )}

        <Pagination />
      </div>
    </section>
  );
}
