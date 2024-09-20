import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true , unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    line1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  phone: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
