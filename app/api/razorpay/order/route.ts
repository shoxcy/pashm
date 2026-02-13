import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    try {
        const { amount, currency } = await request.json();

        const options = {
            amount: amount * 100,
            currency: currency || "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        });
    } catch (error: any) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
