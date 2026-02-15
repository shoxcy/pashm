export default function EnvTestPage() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
  return (
    <div style={{ padding: "40px", fontFamily: "monospace" }}>
      <h1>Environment Variables Test</h1>
      
      <div style={{ background: "#f0f0f0", padding: "20px", marginTop: "20px" }}>
        <h2>Server-Side Environment Variables:</h2>
        <p><strong>SHOPIFY_STORE_DOMAIN:</strong> {domain || "❌ UNDEFINED"}</p>
        <p><strong>SHOPIFY_STOREFRONT_ACCESS_TOKEN:</strong> {token ? `✅ ${token.substring(0, 15)}...` : "❌ UNDEFINED"}</p>
        <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
      </div>

      <div style={{ background: "#ffe", padding: "20px", marginTop: "20px", border: "2px solid #cc0" }}>
        <h3>⚠️ Diagnosis:</h3>
        {!domain || !token ? (
          <div>
            <p style={{ color: "red", fontWeight: "bold" }}>Environment variables are NOT loaded!</p>
            <p>Possible causes:</p>
            <ul>
              <li>Dev server needs to be restarted</li>
              <li>.env file has syntax errors</li>
              <li>Variables have extra spaces or quotes</li>
            </ul>
            <p><strong>Solution:</strong> Restart your dev server (Ctrl+C, then npm run dev)</p>
          </div>
        ) : (
          <p style={{ color: "green", fontWeight: "bold" }}>✅ Environment variables loaded correctly!</p>
        )}
      </div>
    </div>
  );
}
