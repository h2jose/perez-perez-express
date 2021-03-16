import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema({
  dni: { type: String, },
  name: { type: String },
  email: { type: String, maxlength: 50, unique: true, required: true },
  address: { type: String, },
  phone: { type: String,},
  notes: { type: String, },
  active: { type: Boolean, required: true, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model("customer", customerSchema);
export default Customer;
