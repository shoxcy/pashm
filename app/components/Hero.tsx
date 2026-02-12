import Link from "next/link";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section className="relative h-[100vh] w-full bg-[#F6F1E6]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/hero.png')" }}
      />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[10vh] bg-gradient-to-b from-transparent via-[#F6F1E6]/20 to-[#F6F1E6]" />

      <Navbar />

      <div className="relative h-full flex items-center w-full max-w-7xl mx-auto px-8 lg:px-10">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 -translate-y-10 lg:translate-y-20">
          <div className="flex-1 max-w-3xl">
            <p className="text-white/90 type-subhead-italics-d italic font-extralight mb-4">
              Lorem ipsum dolor sit amet
            </p>

            <h1 className="text-white type-h1-italics-d italic font-extralight mb-6">
              The Art of Kashmir, in Every Detail
            </h1>

            <p className="text-white/80 type-body-italics-d italic font-extralight leading-relaxed max-w-2xl">
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatur, vel illum qui dolorem eum
              fugiat quo voluptas nulla pariatur
            </p>
          </div>

          <div>
            <Link
              href="/shop"
              style={{ backgroundImage: "url('/assets/buttonimage.png')" }}
              className="inline-block type-button-1-d tracking-wide translate-x-0 translate-y-10 xl:translate-x-10 lg:translate-y-14 bg-[#E1C882] bg-blend-multiply text-[#0E1822FF] pt-[10px] pb-[10px] pr-[54px] pl-[54px] md:pt-[18px] md:pb-[18px] md:pr-[108px] md:pl-[108px]"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
