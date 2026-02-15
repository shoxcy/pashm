export default function StockStamp() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="px-10 py-2 border border-[#FF0000]/30 bg-white/80 backdrop-blur-sm text-[#FF0000] text-[11px] md:text-[13px] font-medium uppercase tracking-[0.25em] rotate-[-18deg]">
        Out of Stock
      </div>
    </div>
  );
}
