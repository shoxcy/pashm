// "use client";

// import React from "react";
// import Image from "next/image";
// import StockStamp from "../components/StockStamp";
// import Navbar from "../components/pashm-navbar/Navbar";

// export default function TestOutOfStockPage() {
//   return (
//     <div className="min-h-screen bg-[#F6F1E6] pb-20">
//       <Navbar />
      
//       <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
//         <h1 className="font-serif text-[40px] text-[#12385C] mb-12">Out of Stock Design Test</h1>
        
//         <div className="grid gap-16 md:grid-cols-2">
//           {/* Product Card Example */}
//           <section className="space-y-6">
//             <h2 className="text-[20px] font-bold text-[#1A2D3A] uppercase tracking-wider">1. Shop Page Product Card</h2>
//             <div className="max-w-[300px] border border-black/5 bg-white/30 p-6 rounded-[2px] shadow-sm">
//               <div className="relative h-[250px] w-full bg-[#fcf9f3] flex items-center justify-center">
//                 <StockStamp />
//                 <Image 
//                   src="https://placehold.co/600x600?text=Kashmiri+Saffron" 
//                   alt="Test Product" 
//                   fill 
//                   className="object-contain opacity-40"
//                 />
//               </div>
//               <div className="mt-4 space-y-2">
//                 <div className="flex gap-1 text-[#C9A24A] text-[16px]">★★★★★</div>
//                 <h3 className="text-[22px] text-[#1A2D3A]">Kashmiri Saffron</h3>
//                 <div className="text-[14px] text-[#2E3A43]/70">RS. 450</div>
//                 <div className="pt-4 space-y-2">
//                   <button className="w-full bg-[#12385C] opacity-50 cursor-not-allowed py-2 text-white rounded-[2px]">Out of Stock</button>
//                   <button className="w-full bg-[#E1C882] opacity-50 cursor-not-allowed py-2 text-[#0E1822FF] rounded-[2px]">Buy Now</button>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Product View Example */}
//           <section className="space-y-6">
//             <h2 className="text-[20px] font-bold text-[#1A2D3A] uppercase tracking-wider">2. Product Detail Layout</h2>
//             <div className="space-y-8 bg-white/30 p-8 rounded-[2px] border border-black/5 shadow-sm">
//               <div className="relative aspect-square w-full max-w-[400px] mx-auto bg-[#fcf9f3]">
//                 <StockStamp />
//                 <Image 
//                   src="https://placehold.co/800x800?text=Pure+Shilajit" 
//                   alt="Test Detail" 
//                   fill 
//                   className="object-contain opacity-40"
//                 />
//               </div>
              
//               <div className="space-y-4">
//                 <h3 className="font-serif text-[35px] text-[#12385C]">Pure Himalayan Shilajit</h3>
//                 <div className="text-[24px] text-[#1A2D3A]">RS. 6,500</div>
                
//                 <div className="pt-6 space-y-3">
//                   <button className="w-full bg-[#12385C] opacity-50 cursor-not-allowed py-4 text-white rounded-[2px] font-bold">OUT OF STOCK</button>
//                   <button className="w-full bg-[#E1C882] opacity-50 cursor-not-allowed py-4 text-[#0E1822FF] rounded-[2px] font-bold">ADD TO CART</button>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>

//         <div className="mt-20 p-8 bg-black/5 rounded-[2px] border border-dashed border-black/20">
//           <p className="text-[14px] leading-relaxed text-[#2E3A43]/80 italic">
//             Note: This is a diagnostic page created to preview the diagonal "Out of Stock" stamp and the disabled button states. 
//             The actual products on your real Shop and Product pages will automatically inherit these styles if their "availableForSale" status is false in Shopify.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
