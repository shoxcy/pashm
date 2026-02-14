import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Review from "../../../models/Review";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("productId");

        const query = productId ? { productId, status: "approved" } : { status: "approved" };
        const reviews = await Review.find(query).sort({ createdAt: -1 });

        return NextResponse.json(reviews);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { productId, userName, rating, comment } = body;

        if (!productId || !userName || !rating || !comment) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newReview = await Review.create({
            productId,
            userName,
            rating,
            comment,
            status: "approved", // auto-approve for now
        });

        return NextResponse.json(newReview, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
