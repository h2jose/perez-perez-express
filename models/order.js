
import mongoose, { Schema } from 'mongoose';
const orderSchema = new Schema({
	customer: { type: Schema.ObjectId, ref: 'customer' },
	car: { type: Schema.ObjectId, ref: 'car' },
	notes: { type: String, required: true },
	status: { type: String, required: true, default: 'PENDIENTE'},
	paid: { type: String, required: true, default: 'UNPAID'},
	createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('order', orderSchema);
export default Order;
