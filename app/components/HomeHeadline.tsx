export default function HomeHeadline() {
  return (
    <section className="w-full bg-[#F6F1E6] overflow-x-hidden">
      <div
        className="
          mx-auto w-full max-w-5xl
          px-5 sm:px-8 md:px-10 lg:px-14
          py-0 sm:py-14 md:py-16 lg:py-20 xl:py-18
          flex items-center justify-center
        "
      >
        <h1 className="type-h1-italics-d md:text-left text-[#12385C]">
          Lorem ipsum dolor sit amet,{" "}
          <span className="headline-muted">consectetur</span> elit, eiusmod tempor ut{" "}
          <span className="headline-muted">labore</span> et dolore{" "}
          <span className="headline-muted">magnaui</span> aliqua
        </h1>
      </div>
    </section>
  );
}
