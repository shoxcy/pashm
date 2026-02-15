
import { getProducts } from "../../lib/shopify";
import ShopView from "./ShopView";

export const metadata = {
  title: "Shop | Pashm",
  description: "Explore our collection of premium Kashmiri products.",
};

export default async function ShopPage() {
  const products = await getProducts({ reverse: true });

  return <ShopView products={products} />;
}
