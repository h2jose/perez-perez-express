import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  role: { type: String, maxlength: 30, default: 'ADMIN',required: true },
  name: { type: String, required: true },
  email: { type: String, maxlength: 50, unique: true, required: true },
  password: { type: String, maxlength: 64, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("user", userSchema);
export default User;
