import mongoose from "mongoose";



const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    address: {
        line1: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true }
    },
    phone: { type: String, required: true },
    otpExpiresAt: { type: Date, required: true } 
});

const Temp_OTP = mongoose.model('Temp_OTP', otpSchema);
export default Temp_OTP;
