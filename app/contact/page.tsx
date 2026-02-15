"use client";

import { useState } from "react";
import Navbar from "../components/pashm-navbar/Navbar";
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F6F1E6] overflow-x-hidden">
      <Navbar />

      <main className="pt-40 md:pt-48 pb-20 px-6 lg:px-10 flex flex-col items-center justify-center min-h-screen">
        
        <div className="absolute top-40 left-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[700px] lg:h-[700px] opacity-40 pointer-events-none -translate-x-1/4 -translate-y-1/4">
             <Image
               src="/assets/eff1.png"
               alt=""
               fill
               className="object-contain"
               />
        </div>
        <div className="absolute top-40 left-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[700px] lg:h-[700px] opacity-40 pointer-events-none -translate-x-1/4 -translate-y-1/4">
             <Image
               src="/assets/eff1.png"
               alt=""
               fill
               className="object-contain"
               />
        </div>

        <div className="relative w-full max-w-2xl z-10">
          <div className="text-center mb-12 space-y-4">
            <p className="text-[#2E3A43]/60 italic font-light text-lg mb-4 block">
              Get in Touch
            </p>
            <h1 className="text-[#12385C] text-4xl md:text-5xl mb-6 relative z-10">
              Contact Us
            </h1>
             <p className="text-[#2E3A43]/80 type-body-1-d max-w-lg mx-auto leading-relaxed">
              Have questions about our collection or need assistance? We're here to help. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="group">
              <label htmlFor="name" className="block text-[#12385C] type-h3-d text-sm mb-2 opacity-80 group-focus-within:opacity-100 transition-opacity">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#12385C]/20 py-3 text-[#12385C] type-body-1-d focus:outline-none focus:border-[#12385C] transition-colors placeholder-[#12385C]/40"
                 placeholder="Your Name"
              />
            </div>

            <div className="group">
              <label htmlFor="email" className="block text-[#12385C] type-h3-d text-sm mb-2 opacity-80 group-focus-within:opacity-100 transition-opacity">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#12385C]/20 py-3 text-[#12385C] type-body-1-d focus:outline-none focus:border-[#12385C] transition-colors placeholder-[#12385C]/40"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="group">
              <label htmlFor="message" className="block text-[#12385C] type-h3-d text-sm mb-2 opacity-80 group-focus-within:opacity-100 transition-opacity">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-transparent border-b border-[#12385C]/20 py-3 text-[#12385C] type-body-1-d focus:outline-none focus:border-[#12385C] transition-colors placeholder-[#12385C]/40 resize-none"
                placeholder="How can we help you?"
              />
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={status === "submitting"}
                style={{ backgroundImage: "url('/assets/buttonimage.png')" }}
                className="inline-block type-button-1-d tracking-wide bg-[#E1C882] bg-blend-multiply text-[#0E1822FF] py-[10px] px-[54px] disabled:opacity-70 disabled:cursor-not-allowed hover:brightness-105 transition-all"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </div>
            <div className="fixed bottom-6 right-6 justify-center">
              <Link
                href="https://wa.me/919876543210"
                style={{ backgroundImage: "url('/assets/buttonimage.png')" }}
                className="flex justify-center items-center gap-2 type-button-1-d tracking-wide bg-[#25d267] bg-blend-multiply text-[#0E1822FF] py-[10px] px-[10px] rounded-full disabled:opacity-70 disabled:cursor-not-allowed hover:brightness-105 transition-all"
              >
                <BsWhatsapp className="text-white" size={30}/>
              </Link>
            </div>
            {status === "success" && (
              <div className="text-center p-4 bg-[#E1C882]/20 text-[#12385C] rounded-sm animate-fade-in custom-transition">
                <p className="type-body-1-d">Thank you! Your message has been sent.</p>
              </div>
            )}

            {status === "error" && (
              <div className="text-center p-4 bg-red-100 text-red-800 rounded-sm animate-fade-in custom-transition">
                <p className="type-body-1-d">{errorMessage}</p>
              </div>
            )}
          </form>
        </div>
      </main>
      <div className="absolute top-80 right-0 rotate-180 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[700px] lg:h-[700px] opacity-60 pointer-events-none translate-x-1/4 -translate-y-1/4">
              <Image
                src="/assets/eff1.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute top-80 right-0 rotate-180 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[700px] lg:h-[700px] opacity-60 pointer-events-none translate-x-1/4 -translate-y-1/4">
              <Image
                src="/assets/eff1.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
    </div>
  );
}
