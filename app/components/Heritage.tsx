import Image from "next/image";
import Link from "next/link";
import HomeHeadline from "./HomeHeadline";

export default function Heritage() {
  return (
    <section className="relative w-full bg-[#F6F1E6] py-12 md:py-16 lg:py-10 overflow-hidden">
      <div className="absolute top-80 left-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[700px] lg:h-[700px] opacity-60 pointer-events-none -translate-x-1/4 -translate-y-1/4">
        <Image
          src="/assets/eff1.png"
          alt=""
          fill
          className="object-contain"
          />
      </div>
      <div className="absolute top-80 left-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[700px] lg:h-[700px] opacity-60 pointer-events-none -translate-x-1/4 -translate-y-1/4">
        <Image
          src="/assets/eff1.png"
          alt=""
          fill
          className="object-contain"
          />
      </div>
          <HomeHeadline/>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-30">
        <div className="hidden lg:grid lg:grid-cols-[1.2fr_auto_1.5fr] lg:gap-8 xl:gap-12 lg:items-start">
          <div className="flex flex-col gap-6 text-[#12385C] pt-0">
            <h2 className="text-4xl text-[#12385C]">
              The Heritage Behind
            </h2>

            <div className="space-y-5 max-w-md text-[#2E3A43]/80 type-body-1-d leading-relaxed">
              <p>
                Kashmir has long been known for its rare natural resources, from high-altitude shilajit formed over centuries, to saffron grown in the fertile fields of Pampore, to hand-selected dry fruits cultivated in mineral-rich soil.
              </p>
              <p>
                At PASHM, we work closely with trusted local sources to ensure authenticity at every stage. Our products are not mass-produced commodities. They are carefully sourced, minimally processed, and thoroughly quality-checked before reaching you. We believe heritage should be preserved, not commercialized beyond recognition.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                style={{ backgroundImage: "url('/assets/buttonimage.png')" }}
                className="inline-block type-button-1-d tracking-wide bg-[#E1C882] bg-blend-multiply text-[#0E1822FF] py-[10px] px-[54px]"
              >
                Explore the Collection
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative w-[90px] h-[90px] xl:w-[110px] xl:h-[110px] overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/assets/her1.png"
                alt="Heritage thumbnail 1"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="110px"
              />
            </div>
            <div className="relative w-[90px] h-[90px] xl:w-[110px] xl:h-[110px] overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/assets/her2.png"
                alt="Heritage thumbnail 2"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="110px"
              />
            </div>
            <div className="relative w-[90px] h-[90px] xl:w-[110px] xl:h-[110px] overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/assets/her3.png"
                alt="Heritage thumbnail 3"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="110px"
              />
            </div>
            <div className="relative w-[90px] h-[90px] xl:w-[110px] xl:h-[110px] overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/assets/her4.jpg"
                alt="Heritage thumbnail 4"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="110px"
              />
            </div>
          </div>

          <div className="relative w-full aspect-square overflow-hidden rounded-sm shadow-lg">
            <Image
              src="/assets/her1.png"
              alt="Heritage showcase"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="lg:hidden flex flex-col gap-8">
          <div className="flex flex-col gap-5 text-[#12385C]">
            <h2 className="text-4xl text-[#12385C]">
              The Heritage Behind
            </h2>

            <div className="space-y-4 text-[#2E3A43]/80 type-body-1-d leading-relaxed text-[10px] md:text-[16px]">
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis.
              </p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                style={{ backgroundImage: "url('/assets/buttonimage.png')" }}
                className="inline-block type-button-1-d tracking-wide bg-[#E1C882] bg-blend-multiply text-[#0E1822FF] py-3 px-10 text-[16px] md:text-[18px]"
              >
                Shop All Products
              </Link>
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm shadow-md">
            <Image
              src="/assets/her1.png"
              alt="Heritage showcase"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
          </div>

          <div className="grid grid-cols-4 gap-3 md:gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/assets/her1.png"
                alt="Heritage thumbnail 1"
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
            <div className="relative aspect-square w-full overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/assets/her2.png"
                alt="Heritage thumbnail 2"
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
            <div className="relative aspect-square w-full overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/assets/her3.png"
                alt="Heritage thumbnail 3"
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
            <div className="relative aspect-square w-full overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/assets/her4.jpg"
                alt="Heritage thumbnail 4"
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
