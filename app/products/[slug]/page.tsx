import { notFound } from "next/navigation";
import ProductView from "./ProductView";
import { medusa } from "../../../lib/medusa";
import { mapProductToDetailed } from "../../../lib/map-product";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const response = await medusa.store.product.list({
      handle: slug,
      limit: 1,
      region_id: "reg_01KHDS81C9AB0RD3XK6GW46M7D",
      fields: "*variants.calculated_price,+variants.prices",
    });

    if (!response.products || response.products.length === 0) {
      notFound();
    }

    const medusaProduct = response.products[0];
    const product = mapProductToDetailed(medusaProduct);

    return <ProductView product={product} />;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    notFound();
  }
}
