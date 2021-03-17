
import mongoose, { Schema } from 'mongoose';
const orderSchema = new Schema({
	car: { type: Schema.ObjectId, ref: 'car' },
	notes: { type: String, required: true },
	status: { type: String, required: true, default: 'PENDIENTE'},
	createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('order', orderSchema);
export default Order;
