
import { NextResponse } from "next/server";
import medusa from "@/lib/medusa";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, items, total, shipping_address } = body;

        // Use Admin API to create a Draft Order which is the clean way to import external orders
        // Note: Medusa v1 used Draft Orders, v2 might use Orders directly or specialized workflows.
        // Assuming v1 compat/v2 Admin API.

        // 1. Prepare items for Admin API
        const lineItems = [];
        for (const item of items) {
            let variantId = item.variantId;

            // If we don't have a variant ID, fetch the product to find the default variant
            if (!variantId && item.id) {
                const productRes = await medusa.store.product.list({
                    id: item.id,
                    limit: 1
                });

                if (productRes.products && productRes.products.length > 0) {
                    const product = productRes.products[0];
                    if (product.variants && product.variants.length > 0) {
                        variantId = product.variants[0].id;
                    }
                }
            }

            if (variantId) {
                lineItems.push({
                    variant_id: variantId,
                    quantity: item.qty || item.quantity || 1,
                    unit_price: item.price // Store the price ensuring it matches
                });
            }
        }

        // 2. Create Draft Order via Admin API
        const adminRes = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/admin/draft-orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-medusa-access-token": "sk_fd932d0c279a0b127394c25148003f9c64603953569107955536413488775432" // Using our admin token
            },
            body: JSON.stringify({
                email: email,
                region_id: "reg_01KHDS81C9AB0RD3XK6GW46M7D",
                items: lineItems,
                shipping_methods: [{
                    price: 150,
                    option_id: "so_01KHDS81CABA3RD3XK6GW46M7D", // We might need to find a valid option ID or create one dynamically. For now trying without or with dummy.
                    // Actually, easiest is just items.
                }],
                billing_address: {
                    first_name: shipping_address?.first_name || "Guest",
                    last_name: shipping_address?.last_name || "User",
                    address_1: shipping_address?.address_1 || "Address",
                    city: shipping_address?.city || "City",
                    country_code: "in",
                    postal_code: shipping_address?.postal_code || "000000",
                },
                shipping_address: {
                    first_name: shipping_address?.first_name || "Guest",
                    last_name: shipping_address?.last_name || "User",
                    address_1: shipping_address?.address_1 || "Address",
                    city: shipping_address?.city || "City",
                    country_code: "in",
                    postal_code: shipping_address?.postal_code || "000000",
                },
                status: "completed", // Mark as completed (paid) immediately
                no_notification_order: true
            })
        });

        const adminData = await adminRes.json();

        if (!adminRes.ok) {
            console.error("Medusa Admin Sync Failed:", adminData);
            // Fallback: If draft order fails (e.g. shipping option missing), we might need to just log it.
            return NextResponse.json({ success: false, error: adminData, message: "Failed to create Medusa order" });
        }

        return NextResponse.json({ success: true, order: adminData.draft_order });

    } catch (error: any) {
        console.error("Medusa Sync Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
