import { notFound } from "next/navigation";
import ProductView from "./ProductView";
import { getProduct } from "../../../lib/shopify";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} | Pashm`,
    description: product.description || product.seo?.description || "Shop authentic Kashmiri products.",
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const product = await getProduct(slug);

    if (!product) {
      notFound();
    }

    return <ProductView product={product} />;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    notFound();
  }
}
