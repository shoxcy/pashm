import { createShopifyOrder } from "@/lib/shopifyAdmin";
import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(request: Request) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = await request.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            await dbConnect();

            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    razorpayPaymentId: razorpay_payment_id,
                    paymentStatus: "paid",
                },
                { new: true }
            );

            if (order) {
                try {
                    await createShopifyOrder({
                        items: order.items,
                        total: order.total,
                        email: order.email || "no-email@provided.com",
                        address: order.address,
                        razorpayOrderId: razorpay_order_id
                    });
                } catch (shopifyError) {
                    console.error("Failed to sync to Shopify:", shopifyError);
                }
            }

            return NextResponse.json({
                success: true,
                message: "Payment verified successfully",
                order,
            });
        } else {
            return NextResponse.json(
                { success: false, message: "Invalid signature" },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Error verifying Razorpay payment:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
