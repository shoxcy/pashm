"use client";

import Image from "next/image";
import Navbar from "../components/pashm-navbar/Navbar";
import CTA from "../components/CTA";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#F6F1E6] overflow-x-hidden">
      <Navbar />

      <main className="pt-40 md:pt-48 pb-20 px-6 lg:px-10 flex flex-col items-center min-h-screen">
        
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
        <div className="absolute top-300 left-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[700px] lg:h-[700px] opacity-40 pointer-events-none -translate-x-1/4 -translate-y-1/4">
             <Image
               src="/assets/eff1.png"
               alt=""
               fill
               className="object-contain"
               />
        </div>
        <div className="absolute top-300 left-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[700px] lg:h-[700px] opacity-40 pointer-events-none -translate-x-1/4 -translate-y-1/4">
             <Image
               src="/assets/eff1.png"
               alt=""
               fill
               className="object-contain"
               />
        </div>

        <div className="relative w-full max-w-3xl z-10 text-center space-y-16">
          
          <div className="space-y-4">
            <p className="text-[#2E3A43]/60 italic font-light text-lg mb-1 block">
               Rooted in the Himalayas. Built on Trust.
            </p>
            <h1 className="text-[#12385C] text-4xl md:text-5xl mb-6 relative z-10 leading-snug">
               About Pashm
            </h1>
            <p className="text-[#2E3A43]/80 type-body-1-d leading-relaxed max-w-2xl mx-auto">
               Pashm was born from a simple belief, that some of the world’s finest natural treasures deserve to be sourced with integrity and delivered without compromise.
            </p>
          </div>

          <div className="space-y-6 text-[#12385C] type-body-1-d leading-relaxed text-center">
            <p>
              From the high-altitude valleys of Kashmir, we bring you authentic shilajit resin, premium saffron, and carefully selected dry fruits, products shaped by the Himalayan climate, mineral-rich soil, and generations of traditional knowledge.
            </p>
            
            <p className="type-h3-d text-xl pt-4">
              We are not a mass-production brand. We are a sourcing-first company.
            </p>
            
            <p>
              Every product we offer begins at the source.
            </p>
          </div>

          <div className="w-24 h-[1px] bg-[#12385C]/20 mx-auto"></div>
          
          <div className="relative w-full">
            <div className="absolute top-1/2 right-[-50px] lg:right-[-150px] w-[200px] h-[200px] md:w-[300px] md:h-[300px] opacity-30 pointer-events-none -translate-y-1/2 rotate-45">
                 <Image
                   src="/assets/eff2.png"
                   alt=""
                   fill
                   className="object-contain"
                   />
            </div>
            
            <div className="space-y-8 relative z-10">
               <div className="space-y-4">
                   <p className="text-[#2E3A43]/60 italic font-light text-lg mb-1 block">
                      Our Standards
                   </p>
                   <h2 className="text-[#12385C] text-3xl md:text-4xl mb-6 relative z-10 leading-snug">
                     Purity Over Hype
                   </h2>
                   <p className="text-[#2E3A43]/80 type-body-1-d leading-relaxed max-w-2xl mx-auto">
                     In today’s market, “natural” has become a marketing word. For us, it is a responsibility.
                     We work directly with trusted local harvesters and small suppliers in Kashmir who understand the terrain, the seasons, and the delicate balance required to preserve quality.
                   </p>
                   <p className="text-[#2E3A43]/80 type-body-1-d leading-relaxed max-w-2xl mx-auto">
                     Our process focuses on ethical sourcing, minimal processing to retain natural integrity, strict quality checks, and clean packaging that protects purity.
                   </p>
               </div>
  
               <p className="pt-6 text-[#12385C] type-h3-d text-lg italic opacity-80">
                 "No artificial additives. No exaggerated claims. No shortcuts."
               </p>
            </div>
          </div>

          <div className="w-24 h-[1px] bg-[#12385C]/20 mx-auto"></div>

          <div className="relative w-full pb-10">
             <div className="absolute top-10 left-[-50px] lg:left-[-150px] w-[250px] h-[250px] md:w-[350px] md:h-[350px] opacity-30 pointer-events-none -translate-y-1/4 -rotate-12">
                 <Image
                   src="/assets/eff1.png"
                   alt=""
                   fill
                   className="object-contain"
                   />
            </div>

             <div className="space-y-12 relative z-10">
               <div className="space-y-4">
                   <p className="text-[#2E3A43]/60 italic font-light text-lg mb-1 block">
                      Nature's Gifts
                   </p>
                   <h2 className="text-[#12385C] text-3xl md:text-4xl mb-6 relative z-10 leading-snug">
                      The Power of the Himalayas
                   </h2>
               </div> 
               
               <div className="space-y-10 text-center max-w-2xl mx-auto">
                   <div className="space-y-2">
                      <h3 className="text-xl text-[#12385C] type-h2-italics-d">Shilajit Resin</h3>
                      <p className="text-[#2E3A43]/80 type-body-1-d text-sm leading-relaxed">
                        Formed over centuries, authentic resin requires careful collection. We source high-altitude shilajit and ensure it is properly purified and tested without over-processing it into something it was never meant to be.
                      </p>
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-xl text-[#12385C] type-h2-italics-d">Kashmiri Saffron</h3>
                      <p className="text-[#2E3A43]/80 type-body-1-d text-sm leading-relaxed">
                        Grown in Pampore, our saffron is single-origin, carefully graded, and stored to maintain freshness and strength. Known for its deep color and strong aroma, it stands apart from mass-market alternatives.
                      </p>
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-xl text-[#12385C] type-h2-italics-d">Premium Dry Fruits</h3>
                      <p className="text-[#2E3A43]/80 type-body-1-d text-sm leading-relaxed">
                        From hand-selected almonds to curated dried fruit blends, our products are chosen for freshness, texture, and taste, prioritizing quality and flavor over bulk availability.
                      </p>
                   </div>
               </div>
            </div>
          </div>

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
      <div className="absolute top-280 right-0 rotate-180 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[700px] lg:h-[700px] opacity-60 pointer-events-none translate-x-1/4 -translate-y-1/4">
              <Image
                src="/assets/eff1.png"
                alt=""
                fill
                className="object-contain"
              />
      </div>
      <div className="absolute top-280 right-0 rotate-180 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[700px] lg:h-[700px] opacity-60 pointer-events-none translate-x-1/4 -translate-y-1/4">
              <Image
                src="/assets/eff1.png"
                alt=""
                fill
                className="object-contain"
              />
      </div>

      <CTA />
    </div>
  );
}
