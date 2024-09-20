import Restaurant from "../models/restaurant.model.js"
import User from "../models/user.model.js"
import Menu from "../models/menu.model.js"
import Order from "../models/order.model.js"
import Review from "../models/reveiw.model.js"






export const getAllres = async (req, res) => {
    try {
       
        const userId = req.user._id;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userPincode = user.address.postalCode;

        // Find restaurants with matching pincode
        const restaurants = await Restaurant.find({ "address.postalCode": userPincode }).select('-password -email -username');
        
        if (restaurants.length === 0) {
            return res.status(200).json({ message: "No restaurants found for this user" });
        }
        
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurants", error: error.message });
    }
}



export const getnonvegAllres = async (req, res) => {
    try {
        
        const userId = req.user._id;
        
       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userPincode = user.address.postalCode;

        // Find restaurants with matching pincode and type: veg
        const restaurants = await Restaurant.find({ 
            "address.postalCode": userPincode,
            "type": "non-veg"
        }).select('-password -email -username');
        
        if (restaurants.length === 0) {
            return res.status(200).json({ message: "No non-vegetarian restaurants found for this user's pincode" });
        }
        
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vegetarian restaurants", error: error.message });
    }
}

export const getvegAllres = async (req, res) => {
    try {
        
        const userId = req.user.id;
        
       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userPincode = user.address.postalCode;

  
        const restaurants = await Restaurant.find({ 
            "address.postalCode": userPincode,
            "type": "veg"
        }).select('-password -email -username');
        
        if (restaurants.length === 0) {
            return res.status(200).json({ message: "No vegetarian restaurants found for this user's pincode" });
        }
        
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vegetarian restaurants", error: error.message });
    }
}

export const getresbyid = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId).select('-password -email -username');
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurant details", error: error.message });
    }
}

export const getresmenubyid = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const menu = await Menu.findById(restaurantId);
        if (!menu) {
            return res.status(404).json({ message: "menu not found" });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurant menu", error: error.message });
    }
}   

export const orderbyresid= async (req,res)=>{
    try{
        const userId = req.user._id;
        const { restaurantId, items ,totalAmount } = req.body;
        const deliveryAddress = req.user.address;
        const newOrder = new Order({
            userId,
            restaurantId,
            items,
            totalAmount,
            deliveryAddress
        });
        const savedOrder = await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: savedOrder });
    }
    catch(error){
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
}

export const getallorder = async (req,res)=>{
    try{
        const userId = req.user._id;
        const orders = await Order.find({ userId });
        res.status(200).json(orders);
    }
    catch(error){
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { username, email, address,fullname,phonenumber,password } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, {
            username,
            email,
            address,
            fullname,
            phonenumber,
            password
        }, { new: true }).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user profile", error: error.message });
    }
};

export const postReview = async (req, res) => {
    try {
        const { restaurantId, rating, review } = req.body;
        const userId = req.user._id;
        if(!restaurantId || !rating || !review){
            return res.status(400).json({ message: "All fields are required" });
        }
        if(rating>5|| rating<1){
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }
        const existingReview = await Review.findOne({ userId, restaurantId });
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this restaurant" });
        }

        const newReview = new Review({
            userId,
            restaurantId,
            rating,
            review
        });

        const savedReview = await newReview.save();

        await Restaurant.findByIdAndUpdate(restaurantId, {
            $push: {
                rating: { reviewId: savedReview._id, rating: savedReview.rating }
            }
        });
        res.status(201).json({ message: "Review posted successfully", review: savedReview });
    } catch (error) {
        res.status(500).json({ message: "Error posting review", error: error.message });
    }
};

