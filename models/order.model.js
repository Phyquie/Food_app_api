import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.String, ref: 'User', required: true }, // References the user
    restaurantId: { type: mongoose.Schema.Types.String, ref: 'Restaurant', required: true }, // References the restaurant
    items: [
      {
        menuItemId: { type: mongoose.Schema.Types.String, ref: 'MenuItem', required: true }, // Reference to menu item
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'delivered', 'cancelled'], default: 'pending' },
    deliveryAddress: {
      line1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
  });
  
   const Order= mongoose.model('Order', orderSchema);
   export default Order;
  