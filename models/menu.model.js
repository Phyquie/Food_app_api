import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.String, ref: 'Restaurant', required: true }, // References the restaurant
    category: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String},
  });
  
  const Menu = mongoose.model('MenuItem', menuItemSchema);
  export default Menu;
  