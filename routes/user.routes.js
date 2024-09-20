 import express from 'express';
 import {getAllres,getvegAllres,getnonvegAllres,getresbyid,getallorder,getresmenubyid,updateUserProfile,orderbyresid,postReview} from '../controller/user.controller.js';
 import {protectRoute} from '../middleware/protectRoute.js';
 

 const router = express.Router();

 router.get('/allrestaurant',protectRoute, getAllres);
 router.get('/vegrestaurant',protectRoute, getvegAllres);
 router.get('/nonvegrestaurant',protectRoute, getnonvegAllres);
 router.get('/restaurantbyid/:id',protectRoute, getresbyid);
 router.get('/getallorder',protectRoute,getallorder);
 router.get('/getresmenubyid/:id',protectRoute,getresmenubyid);
 router.post('/updateuserprofile',protectRoute,updateUserProfile);
 router.post('/orderbyresid',protectRoute,orderbyresid);
 router.post('/postreview',protectRoute,postReview);

 

 export default router; 