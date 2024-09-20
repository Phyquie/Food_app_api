import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.String, ref: 'Restaurant', required: true }, // References the restaurant
    userId: { type: mongoose.Schema.Types.String, ref: 'User', required: true }, // References the user
    rating: { type: Number, required: true },
    review: { type: String, required: true },
  });
  
  const Review = mongoose.model('Review', reviewSchema);
  export default Review;
  