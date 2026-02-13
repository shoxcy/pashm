import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const data = await request.json();
        const {
            uid,
            firstName,
            lastName,
            email,
            phoneNumber,
            authProvider,
            photoURL,
            address,
            city,
            state,
            pincode,
            country
        } = data;

        if (!uid || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const user = await User.findOneAndUpdate(
            { uid },
            {
                firstName,
                lastName,
                email,
                phoneNumber,
                authProvider,
                photoURL,
                address,
                city,
                state,
                pincode,
                country,
            },
            { upsert: true, new: true, runValidators: true }
        );

        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        console.error("Error updating user:", error);

        if (error.code === 11000) {
            if (error.keyPattern?.email) {
                return NextResponse.json({ error: "Email already in use by another account." }, { status: 409 });
            }
            if (error.keyPattern?.uid) {
                return NextResponse.json({ error: "User ID already exists." }, { status: 409 });
            }
        }

        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const uid = searchParams.get("uid");

        if (!uid) {
            return NextResponse.json({ error: "Missing uid" }, { status: 400 });
        }

        const user = await User.findOne({ uid });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
