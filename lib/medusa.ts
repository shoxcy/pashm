import Medusa from "@medusajs/js-sdk";

const MEDUSA_BACKEND_URL =
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

/**
 * Medusa JS SDK client instance
 * Configured to connect to the Medusa v2 backend
 */
export const medusa = new Medusa({
    baseUrl: MEDUSA_BACKEND_URL,
    debug: process.env.NODE_ENV === "development",
    publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});

export default medusa;
