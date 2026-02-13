import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: String, // Firebase UID
            required: true,
            index: true,
        },
        items: [
            {
                id: String,
                title: String,
                price: Number,
                qty: Number,
                image: String,
            },
        ],
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["depart", "shipped", "delivered"],
            default: "depart",
        },
        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
