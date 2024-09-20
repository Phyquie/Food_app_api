import Restaurant from "../models/restaurant.model.js"
import Menu from "../models/menu.model.js"
import Order from "../models/order.model.js"
import Review from "../models/reveiw.model.js"
import { v2 as cloudinary } from "cloudinary";
import Payment from "../models/payment.model.js";

export const addMenu = async (req, res) => {
    try{
        const restaurantId = req.user._id;
        const {name,description,price,image,category} = req.body;

        if(!name || !description || !price || !category){
            return res.status(400).json({message:"All fields are required"});
        }
        if(image){
            const result=await cloudinary.uploader.upload(image);
            image=result.secure_url;
        }

        const newMenu = new Menu({
            restaurantId,
            name,
            description,
            price,
            image,
            category
        })
        
        const savedMenu = await newMenu.save();
        res.status(201).json({message:"Menu added successfully",menu:savedMenu});
    }catch(error){
        res.status(500).json({message:"Error adding menu",error:error.message});
    }
}


export const updateMenu = async (req,res) => {
    try{
        const restaurantId = req.user._id;
        console.log(restaurantId);
        const menuId = req.params.id;
        const { name, description, price, image, category } = req.body;

        const existingMenu = await Menu.findOne({ _id: menuId, restaurantId });
        if (!existingMenu) {
            return res.status(403).json({ message: "You don't have permission to update this menu item" });
        }
    
        if (!name && !description && !price && !image && !category) {
            return res.status(400).json({ message: "At least one field is required for update" });
        }

        const updateFields = {};
        if (name) updateFields.name = name;
        if (description) updateFields.description = description;
        if (price) updateFields.price = price;
        if (category) updateFields.category = category;

        if (image) {
            if (existingMenu.image) {
                await cloudinary.uploader.destroy(existingMenu.image.split("/").pop().split(".")[0]);
            }
            const result = await cloudinary.uploader.upload(image);
            updateFields.image = result.secure_url;
        }

        const updatedMenu = await Menu.findByIdAndUpdate(menuId, updateFields, { new: true });
        
        res.status(200).json({ message: "Menu updated successfully", menu: updatedMenu });
    } catch (error) {
        res.status(500).json({ message: "Error updating menu", error: error.message });
    }
}   

export const getActiveOrders = async (req,res) => {
    try{
        const restaurantId = req.user._id;
        const orders = await Order.find({restaurantId,status:"pending"});
        res.status(200).json({orders});
    }catch(error){
        res.status(500).json({message:"Error fetching active orders",error:error.message});
    }
}

export const getPaymentHistory = async (req,res) => {
    try{
        const restaurantId = req.user._id;
        const payments = await Payment.find({restaurantId}).populate("orderId");
        res.status(200).json({payments});
    }catch(error){
        res.status(500).json({message:"Error fetching payment history",error:error.message});
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const orderId  = req.params.id;
        const restaurantId = req.user._id;
        let order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        if (order.restaurantId.toString() !== restaurantId.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this order" });
        }

        const { status } = req.body;
        order = await Order.findByIdAndUpdate(orderId, { status }, { new: true }); 
        if (status === "confirmed") {
            const payment = new Payment({
                orderId,
                amount: order.totalAmount, 
                paymentMethod: order.paymentMethod,
                status: "pending",
                transactionId: "1234567890", 
                restaurantId,
            });        
            await payment.save();
        }   
        res.status(200).json({ message: "Order status updated", order });

    } catch (error) {
        
        res.status(500).json({ message: "Error updating order status", error: error.message });
    }
};
