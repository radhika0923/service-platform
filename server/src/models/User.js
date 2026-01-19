import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "worker", "admin"], default: "customer" },
    createdAt: { type: Date, default: Date.now },
    approved: { type: Boolean, default: false } // in User schema

});

// Hash password before saving
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
