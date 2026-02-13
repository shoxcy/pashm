import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const uid = searchParams.get("uid");

        if (!uid) {
            return NextResponse.json({ error: "Missing uid" }, { status: 400 });
        }

        const orders = await Order.find({ user: uid }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, orders });
    } catch (error: any) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const data = await request.json();

        const newOrder = new Order({
            user: data.user,
            items: data.items,
            total: data.total,
            address: data.address,
            razorpayOrderId: data.razorpayOrderId,
            status: "depart",
            paymentStatus: "pending",
        });

        await newOrder.save();

        return NextResponse.json({ success: true, order: newOrder });
    } catch (error: any) {
        console.error("Error creating order:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
