import type { HttpTypes } from "@medusajs/types";

/**
 * Flat product structure expected by the UI
 */
export type FlatProduct = {
    id: string;
    slug: string;
    title: string;
    price: string;
    img: string;
    reviewsCount: number;
    rating: number;
};

/**
 * Extended product structure for detail pages
 */
export type DetailedProduct = FlatProduct & {
    subtitle?: string;
    description?: string;
    images: string[];
    variants: Array<{
        id: string;
        title: string;
        inventory_quantity: number;
        prices: Array<{
            amount: number;
            currency_code: string;
        }>;
    }>;
    productDetails?: string;
    usage?: string;
    warnings?: string;
    reviews?: number; // Keep for backward compat
};

/**
 * Format price to INR currency format
 */
export function formatINR(amount: number): string {
    return `RS. ${amount.toLocaleString("en-IN")}`;
}

/**
 * Extract price from Medusa product variant
 * Returns the first variant's price in INR
 */
function extractPrice(product: HttpTypes.StoreProduct): number {
    if (!product.variants || product.variants.length === 0) {
        return 0;
    }

    const firstVariant = product.variants[0] as any;

    // 1. Try calculated_price (Medusa v2 default)
    if (firstVariant.calculated_price) {
        return firstVariant.calculated_price.calculated_amount || 0;
    }

    // 2. Fallback to prices array if calculated_price is missing (common during dev/seed)
    if (firstVariant.prices && firstVariant.prices.length > 0) {
        // Find INR price specifically
        const inrPrice = firstVariant.prices.find((p: any) => p.currency_code?.toLowerCase() === "inr");
        if (inrPrice) {
            return inrPrice.amount || 0;
        }
        // or just return first price if no INR
        return firstVariant.prices[0].amount || 0;
    }

    return 0;
}

/**
 * Map Medusa product to flat structure for product cards
 * @param product - Medusa product object
 * @returns Flat product object for UI consumption
 */
export function mapProductToFlat(
    product: HttpTypes.StoreProduct
): FlatProduct {
    const priceAmount = extractPrice(product);

    // Pick first image if thumbnail is missing
    const img = product.thumbnail ||
        (product.images && product.images.length > 0 ? product.images[0].url : "/assets/products/placeholder.png");

    return {
        id: product.id,
        slug: product.handle || product.id,
        title: product.title || "Untitled Product",
        price: formatINR(priceAmount),
        img: img,
        reviewsCount: (product.metadata?.reviews as number) || 0,
        rating: (product.metadata?.rating as number) || 5,
    };
}

/**
 * Map Medusa product to detailed structure for product detail pages
 * @param product - Medusa product object
 * @returns Detailed product object with all necessary fields
 */
export function mapProductToDetailed(
    product: HttpTypes.StoreProduct
): DetailedProduct {
    const flatProduct = mapProductToFlat(product);
    const priceAmount = extractPrice(product);

    // Map images
    const images = product.images && product.images.length > 0
        ? product.images.map((img) => img.url)
        : product.thumbnail
            ? [product.thumbnail]
            : ["/assets/products/placeholder.png"];

    // Map variants with proper typing
    const variants =
        product.variants?.map((variant: any) => {
            let variantPrice = variant.calculated_price?.calculated_amount || 0;

            if (variantPrice === 0 && variant.prices && variant.prices.length > 0) {
                const inr = variant.prices.find((p: any) => p.currency_code?.toLowerCase() === "inr");
                variantPrice = inr ? inr.amount : variant.prices[0].amount;
            }

            return {
                id: variant.id,
                title: variant.title || "",
                inventory_quantity: variant.inventory_quantity ?? 100,
                prices: [
                    {
                        amount: variantPrice,
                        currency_code: "INR",
                    },
                ],
            };
        }) || [];

    return {
        ...flatProduct,
        subtitle: product.subtitle || "",
        description: product.description || "",
        images,
        variants,
        productDetails: product.metadata?.productDetails as string || "",
        usage: product.metadata?.usage as string || "",
        warnings: product.metadata?.warnings as string || "",
        reviews: (product.metadata?.reviews as number) || 119,
        rating: (product.metadata?.rating as number) || 4,
    };
}
