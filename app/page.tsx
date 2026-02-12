import CTA from "./components/CTA";
import Heritage from "./components/Heritage";
import Hero from "./components/Hero";
import LauncedProducts from "./components/LaunchedProducts";

export default function Home() {
  return (
    <div>
      <Hero/>
      <LauncedProducts/>
      <Heritage/>
      <CTA/>
    </div>
  );
}
