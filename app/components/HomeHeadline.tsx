export default function HomeHeadline() {
  return (
    <section className="w-full bg-[#F6F1E6] overflow-x-hidden overflow-y-hidden">
      <div
        className="
          mx-auto w-full max-w-7xl
          px-5 sm:px-8 md:px-10 lg:px-14
          py-0 sm:py-14 md:py-16 lg:py-20 xl:py-18
          flex items-center justify-center
        "
      >
        <h1 className="type-h1-italics-d md:text-left text-[#12385C]">
          From Kashmir’s valleys to your daily ritual Himalayan treasures,{" "}
          <span className="headline-muted">responsibly</span> sourced,{" "}
          <span className="headline-muted">carefully</span> preserved,{" "}
          <span className="headline-muted">delivered</span> with quiet confidence.
        </h1>
      </div>
    </section>
  );
}
