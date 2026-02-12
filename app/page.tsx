import Hero from "./components/Hero";
import HomeHeadline from "./components/HomeHeadline";
import LauncedProducts from "./components/LaunchedProducts";

export default function Home() {
  return (
    <div>
      <Hero/>
      <LauncedProducts/>
      <HomeHeadline/>
    </div>
  );
}
