import Link from 'next/link';
import Navbar from './components/Navbar';

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#0E1822] overflow-hidden">
      <Navbar />
      
      <div 
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{ 
          backgroundImage: "url('/assets/hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="font-heading text-[120px] md:text-[250px] leading-none text-[#D6C78F]/10 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none">
          404
        </h1>
        <div className="relative z-20 flex flex-col items-center gap-8 max-w-2xl mx-auto pt-20">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#F6F3EE] mb-2 italic">
            Page Not Found
          </h2>
          <p className="font-body text-base md:text-lg text-[#F6F3EE]/70 max-w-lg mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link
            href="/"
            style={{ backgroundImage: "url('/assets/buttonimage.png')" }}
            className="inline-block type-button-1-d tracking-wide bg-[#E1C882] bg-blend-multiply text-[#0E1822] py-3 px-8 md:py-3 md:px-12"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
