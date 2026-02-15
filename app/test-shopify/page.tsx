import { getProducts } from "@/lib/shopify";

export default async function TestShopifyPage() {
  // Log environment variables (server-side only)
  console.log("=== SHOPIFY CONFIG ===");
  console.log("Domain:", process.env.SHOPIFY_STORE_DOMAIN);
  console.log("Token exists:", !!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
  console.log("Token length:", process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.length);
  
  const products = await getProducts({ reverse: true });

  console.log("=== PRODUCTS FETCHED ===");
  console.log("Count:", products.length);
  console.log("Products:", JSON.stringify(products, null, 2));

  return (
    <div style={{ padding: "40px", fontFamily: "monospace" }}>
      <h1>Shopify Connection Test</h1>
      
      <div style={{ background: "#fef", padding: "20px", marginTop: "20px", border: "2px solid #c0c" }}>
        <h2>🔧 Configuration</h2>
        <p><strong>Domain:</strong> {process.env.SHOPIFY_STORE_DOMAIN || "❌ NOT SET"}</p>
        <p><strong>Token:</strong> {process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ? `✅ Set (${process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN.substring(0, 10)}...)` : "❌ NOT SET"}</p>
      </div>

      <p style={{ marginTop: "20px" }}><strong>Total products found:</strong> {products.length}</p>
      
      {products.length === 0 ? (
        <div style={{ background: "#fee", padding: "20px", marginTop: "20px" }}>
          <h2>❌ No products found</h2>
          <p>Check console for errors (press F12)</p>
          <p>Check terminal for server-side logs</p>
        </div>
      ) : (
        <div style={{ background: "#efe", padding: "20px", marginTop: "20px" }}>
          <h2>✅ Products loaded successfully!</h2>
          {products.map((product) => (
            <div key={product.id} style={{ border: "1px solid #ccc", padding: "20px", marginTop: "20px" }}>
              <h3>{product.title}</h3>
              <p><strong>Handle:</strong> {product.handle}</p>
              <p><strong>Price:</strong> {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}</p>
              <p><strong>Description:</strong> {product.description}</p>
              {product.featuredImage && (
                <img src={product.featuredImage.url} alt={product.title} style={{ maxWidth: "200px" }} />
              )}
              <p><strong>Available:</strong> {product.availableForSale ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      )}
      
      <div style={{ marginTop: "40px", background: "#eef", padding: "20px" }}>
        <h3>Debug Info:</h3>
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
          {JSON.stringify(products, null, 2)}
        </pre>
      </div>
    </div>
  );
}
