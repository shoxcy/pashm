const domain = process.env.SHOPIFY_STORE_DOMAIN;
const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

export async function createShopifyOrder(orderData: {
    items: { id: string; qty: number; price: number; title: string }[];
    total: number;
    email: string;
    address: string;
    razorpayOrderId: string;
}) {
    if (!domain || !adminAccessToken) {
        console.error("Shopify Admin not configured");
        return null;
    }

    const url = `https://${domain}/admin/api/2024-01/orders.json`;

    try {
        const lineItems = orderData.items.map((item) => {
            const numericId = item.id.includes("gid://shopify/ProductVariant/")
                ? item.id.split("/").pop()
                : item.id;

            return {
                variant_id: numericId,
                quantity: item.qty,
                price: item.price.toString(),
                title: item.title,
            };
        });

        const orderPayload = {
            order: {
                line_items: lineItems,
                email: orderData.email,
                financial_status: "paid",
                total_price: orderData.total.toString(),
                currency: "INR",
                shipping_address: {
                    address1: orderData.address,
                    // You might want to parse more address fields if available
                },
                noteAttributes: [
                    {
                        name: "Razorpay Order ID",
                        value: orderData.razorpayOrderId
                    }
                ],
                // Mark order as processed
                inventory_behaviour: "decrement_ignoring_policy"
            }
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": adminAccessToken,
            },
            body: JSON.stringify(orderPayload),
        });

        const data = await response.json();

        if (data.errors) {
            console.error("Shopify Admin API Errors:", data.errors);
            return null;
        }

        return data.order;
    } catch (error) {
        console.error("Error creating Shopify order:", error);
        return null;
    }
}
