import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        authProvider: {
            type: String,
            default: "local",
        },
        photoURL: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        pincode: {
            type: String,
        },
        country: {
            type: String,
            default: "India",
        },
    },
    { timestamps: true }
);

if (mongoose.models.User) {
    delete (mongoose.models as any).User;
}

export default mongoose.model("User", UserSchema);
