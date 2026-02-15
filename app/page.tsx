import CTA from "./components/CTA";
import Heritage from "./components/Heritage";
import Hero from "./components/Hero";
import LauncedProducts from "./components/LaunchedProducts";
import { getProducts } from "@/lib/shopify";

export default async function Home() {
  const products = await getProducts({ reverse: true });

  return (
    <div>
      <Hero/>
      <LauncedProducts products={products} />
      <Heritage/>
      <CTA/>
    </div>
  );
}
