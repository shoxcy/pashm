"use client";

import Image from "next/image";
import { useState } from "react";
import Heritage from "./Heritage";

export default function CTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section className="relative w-full bg-[#F6F1E6] h-[64vh] items-center flex justify-center overflow-hidden">
      <div className="absolute top-20 right-0 rotate-180 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[700px] lg:h-[700px] opacity-60 pointer-events-none translate-x-1/4 -translate-y-1/4">
        <Image
          src="/assets/eff1.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute top-20 right-0 rotate-180 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[700px] lg:h-[700px] opacity-60 pointer-events-none translate-x-1/4 -translate-y-1/4">
        <Image
          src="/assets/eff1.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col items-center text-center gap-8">
          <h2 className="text-[#12385C] font-serif italic text-2xl md:text-3xl lg:text-4xl max-w-2xl leading-relaxed">
            Sign up to the be the first to know. Receive 10% off your first two orders.
          </h2>

          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="relative flex items-center border-2 border-dashed border-[#12385C]/30 rounded-sm overflow-hidden bg-transparent">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Youremail@email.com"
                required
                className="flex-1 px-6 py-4 bg-transparent text-[#12385C] placeholder:text-[#12385C]/50 type-body-1-d focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-4 text-[#12385C] type-body-1-d font-medium hover:bg-[#12385C]/5 transition-colors"
              >
                SEND
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
