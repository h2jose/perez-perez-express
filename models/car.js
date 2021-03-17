import mongoose, { Schema } from "mongoose";

const CarSchema = new Schema({
	customer: { type: Schema.ObjectId, ref: 'customer' },
	number: { type: String, maxlength: 50, unique: true, required: true },
	marca: { type: String, maxlength: 100, required: true },
	modelo: { type: String, maxlength: 100, required: true },
	anno: { type: String, maxlength: 100, required: true },
	createdAt: { type: Date, default: Date.now },
});

const car = mongoose.model("car", CarSchema);
export default car;