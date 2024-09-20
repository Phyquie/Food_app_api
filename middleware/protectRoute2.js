import Restaurant from "../models/restaurant.model.js";
import jwt from "jsonwebtoken";

export const protectRoute2 = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).send({message: "You are not authorized"});
        }
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Restaurant.findById(userId).select("-password");
        if(!user){
            return res.status(401).send({message: "You are not authorized"});
        }
        req.user = user;
        next();
    }
    catch(error){
        console.log("error in protectRoute middleware", error);
        res.status(500).send(error.message);
    }};