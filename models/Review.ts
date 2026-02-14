import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
    productId: string;
    userName: string;
    userEmail?: string;
    rating: number;
    comment: string;
    status: "pending" | "approved" | "rejected";
    createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
    productId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "approved" }, // Default to approved for now as requested
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
