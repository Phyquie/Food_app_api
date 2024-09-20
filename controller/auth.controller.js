import User from "../models/user.model.js";
import Restaurant from "../models/restaurant.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie}  from "../utilis/generateToken.js";
export const signup = async (req, res) => {
 try{
    const{fullname, username, email, password,address,phone} = req.body;
    const { line1, city, state, postalCode } = address;

if (!line1 || !city || !state || !postalCode) {
  return res.status(400).json({ message: "Complete address is required" });
}

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(email)){
        return res.status(400).send({message: "Invalid email Format"});
    }

    const existingUser =await User.findOne({username});
    if(existingUser){
        return res.status(400).send({message: "Username already taken"});
    }
    const existingEmail=await User.findOne({email});
    if(existingEmail){
        return res.status(400).send({message: "Email already taken"});
    }
    const existingPhone=await User.findOne({phone});
    if(existingPhone){
        return res.status(400).send({message: "Phone number already taken"});
    }

    if(password.length < 6){
        return res.status(400).send({message: "Password must be atleast 6 characters long"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        fullname,
        username,
        email,
        password: hashedPassword,
        address,
        phone,
    });

    if(newUser){
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({_id:newUser._id,
             username:newUser.username, email:newUser.email, 
            fullname:newUser.fullname,
            address:newUser.address,
            phone:newUser.phone,
        });

    }else{
        res.status(500).send({message: "Something went wrong"});
    }


 }catch(error){
    console.log(error);
 }};


export const login = async (req, res) => {
    try{

        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordValid = user && await bcrypt.compare(password, user.password);
if(!user || !isPasswordValid){
    return res.status(400).send({message: "Username or Password is worng"});}
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({_id:user._id,
        username:user.username, email:user.email, 
       fullname:user.fullname,
       address:user.address,
       phone:user.phone,});

    }
    catch(error){
        console.log("error in login controller", error);
        res.status(500).send({message: "Something went wrong"});
    }};

export const logout = async (req, res) => {  
      try {res.cookie("jwt", "", {maxAge:0})
      res.status(200).send({message: "Logged out successfully"});}
      catch (error) {
        console.log("error in logout controller", error);}  };

export const getMe = async (req, res) => {
    try{const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    }
    catch (error) {
        console.log("error in getMe controller", error);
        res.status(500).send({message: "Something went wrong"});}
};


//Restaurant authntication

export const ressignup = async (req, res) => {
    try{
       const{fullname, username, email, password,address,phone ,type} = req.body;
       const { line1, city, state, postalCode } = address;
   
   if (!line1 || !city || !state || !postalCode) {
     return res.status(400).json({ message: "Complete address is required" });
   }
   
       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   
       if(!emailRegex.test(email)){
           return res.status(400).send({message: "Invalid email Format"});
       }
   
       const existingUser =await Restaurant.findOne({username});
       if(existingUser){
           return res.status(400).send({message: "Username already taken"});
       }
       const existingEmail=await Restaurant.findOne({email});
       if(existingEmail){
           return res.status(400).send({message: "Email already taken"});
       }
       const existingPhone=await Restaurant.findOne({phone});
       if(existingPhone){
           return res.status(400).send({message: "Phone number already taken"});
       }
   
       if(password.length < 6){
           return res.status(400).send({message: "Password must be atleast 6 characters long"});
       }
   
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
       const newRestaurant = new Restaurant({
           fullname,
           username,
           email,
           password: hashedPassword,
           address,
           phone,
           type
       });
   
       if(newRestaurant){
           generateTokenAndSetCookie(newRestaurant._id, res);
           await newRestaurant.save();
           res.status(201).json({_id:newRestaurant._id,
                username:newRestaurant.username, email:newRestaurant.email, 
               fullname:newRestaurant.fullname,
               address:newRestaurant.address,
               phone:newRestaurant.phone,
                type:newRestaurant.type
           });
   
       }else{
           res.status(500).send({message: "Something went wrong"});
       }
   
   
    }catch(error){
       console.log(error);
    }};

    export const reslogin = async (req, res) => {
        try{
    
            const {username, password} = req.body;
            const user = await Restaurant.findOne({username});
            const isPasswordValid = user && await bcrypt.compare(password, user.password);
    if(!user || !isPasswordValid){
        return res.status(400).send({message: "Username or Password is worng"});}
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({_id:user._id,
            username:user.username, email:user.email, 
           fullname:user.fullname,
           address:user.address,
           phone:user.phone,});
    
        }
        catch(error){
            console.log("error in login controller", error);
            res.status(500).send({message: "Something went wrong"});
        }};


        export const resgetMe = async (req, res) => {
            try{const user = await Restaurant.findById(req.user._id).select("-password");
                res.status(200).json(user);
            }
            catch (error) {
                console.log("error in getMe controller", error);
                res.status(500).send({message: "Something went wrong"});}
        };