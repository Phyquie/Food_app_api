import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.String, ref: 'Order', required: true }, // References the order
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['credit_card', 'upi', 'cash_on_delivery'], required: true, default: 'cash_on_delivery' },
  status: { type: String, enum: ['completed', 'pending', 'failed'], required: true, default: 'pending' },
  transactionId: { type: String, required: true ,default: '1234567890'},
  restaurantId: { type: mongoose.Schema.Types.String, ref: 'Restaurant', required: true },
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
