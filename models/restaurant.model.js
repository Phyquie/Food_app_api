import mongoose from 'mongoose';
const restaurantSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    address: {
      line1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    type: { type: String, required: true ,
      enum: ['veg', 'non-veg']},
    password: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true , unique: true},
  email: { type: String, required: true, unique: true },
    rating: [
      {
        reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
        rating: { type: Number},
      },
    ],
  });
  
  const Restaurant = mongoose.model('Restaurant', restaurantSchema);
  export default Restaurant;
  