
import Medusa from "@medusajs/js-sdk";

/**
 * Medusa Admin API Client
 * Used for server-side operations requiring admin privileges (like creating orders without payment)
 * WARNING: Do not expose this client to the frontend!
 */
const medusaAdmin = new Medusa({
    baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
    apiKey: "sk_fd932d0c279a0b127394c25148003f9c64603953569107955536413488775432", // Typically from env variable
});

// For v2 we might need slightly different config or auth headers if using new auth module
// But the JS SDK generally works for Admin API if apiKey is provided.

export default medusaAdmin;
