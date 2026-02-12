"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/pashm-navbar/Navbar";
import { useCart } from "../../context/CartContext";

function formatINR(n: number) {
  return `RS. ${n.toLocaleString("en-IN")}`;
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  const delivery = 150;
  const total = subtotal + (cart.length > 0 ? delivery : 0);

  return (
    <section className="min-h-screen bg-[#F6F1E6]">
      <Navbar />

      <div className="mx-auto w-full max-w-[1180px] px-4 pb-24 pt-40 sm:px-6 lg:px-8 lg:pt-56">
        <h1 className="font-serif text-[35px] px-7 md:px-20 leading-none text-[#12385C]">
          Your Cart
        </h1>
        <div className="border-b border-black/10 mt-10"></div>
        <div className="mt-10 grid gap-16 px-7 md:px-20 lg:grid-cols-[1fr_500px]">
          <div className="space-y-10">
            {cart.length === 0 ? (
              <div className="py-20">
                <p className="mb-8 font-serif text-[22px] text-[#2E3A43]/65">
                  Your cart is empty.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-[2px] bg-[#12385C] px-10 py-3 text-[14px] text-white transition-colors hover:bg-[#12385C]/90"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-12">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start gap-10">
                    <div className="relative h-[120px] w-[120px] overflow-hidden rounded-[2px] bg-black/5">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-[24px] leading-tight text-[#12385C]">
                        {item.title}
                      </h3>

                      <div className="mt-1 text-[14px] text-[#1A2D3A]">
                        {formatINR(item.price)}
                      </div>

                      <div className="mt-4 text-[12px] text-[#2E3A43]/60 uppercase">
                        Quantity
                      </div>

                      <div className="mt-2 flex items-center gap-5 text-[#1A2D3A]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                          className="text-[16px] hover:opacity-60 transition-opacity"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span className="w-6 text-center text-[14px]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-[16px] hover:opacity-60 transition-opacity"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="mt-3 text-[9px] font-semibold tracking-[0.18em] text-[#2E3A43]/55 uppercase">
                        In stock
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 inline-block text-[11px] text-[#7A3C3C] underline underline-offset-4 decoration-[#7A3C3C]/30 transition-colors hover:text-[#12385C] hover:decoration-[#12385C]/40"
                      >
                        Remove from cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="h-fit">
            <div className="space-y-10">
              <div>
                <div className="text-[14px] text-[#2E3A43]/55 uppercase">
                  Order Summary
                </div>

                <div className="mt-6 space-y-4 text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#2E3A43]/70">Item Subtotal</span>
                    <span className="text-[#1A2D3A]">{formatINR(subtotal)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#2E3A43]/70">Delivery</span>
                    <span className="text-[#1A2D3A]">
                      {formatINR(cart.length > 0 ? delivery : 0)}
                    </span>
                  </div>

                  <div className="mt-6 h-px w-full bg-black/10" />

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[18px] font-semibold text-[#1A2D3A]">
                      Total
                    </span>
                    <span className="text-[18px] font-semibold text-[#1A2D3A]">
                      {formatINR(total)}
                    </span>
                  </div>
                  <div className="mt-6 h-px w-full bg-black/10" />
                </div>
              </div>

              <div>
                <div className="text-[13px] font-bold text-[#2E3A43]/55 uppercase">
                  Add a Promo Code
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Enter Code"
                    className="h-[34px] flex-1 rounded-[2px] border border-[#2E3A43]/25 bg-transparent px-3 text-[12px] text-[#1A2D3A] placeholder:text-[#2E3A43]/45 focus:outline-none focus:border-[#12385C]/45"
                  />
                  <button
                    type="button"
                    aria-label="Apply promo code"
                    className="h-[34px] w-[58px] text-sm rounded-[2px] border border-[#2E3A43]/25 bg-transparent transition-colors hover:bg-black/5"
                  >Enter </button>
                </div>
              </div>

              <button
                type="button"
                style={{ backgroundImage: "url('/assets/blue-button.png')" }}
                className="relative w-full rounded-[2px] bg-[#12385C] bg-blend-multiply py-4 text-[17x] text-white transition-colors hover:bg-[#12385C]/95"
              >
                Continue to Checkout
                <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/20" />
              </button>
              <div className="flex items-center gap-6">
                <Image
                  src="/assets/upi.png"
                  alt="UPI"
                  width={100000000000}
                  height={100000000000}
                  className="object-contain w-10 h-10"
                />
                <Image
                  src="/assets/visa.png"
                  alt="Visa"
                  width={100000000000}
                  height={100000000000}
                  className="object-contain w-10 h-10"
                />
                <Image
                  src="/assets/mastercard.png"
                  alt="Mastercard"
                  width={100000000000}
                  height={100000000000}
                  className="object-contain w-10 h-10"
                />
                <Image
                  src="/assets/paypal.png"
                  alt="PayPal"
                  width={100000000000}
                  height={100000000000}
                  className="object-contain w-10 h-10"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
