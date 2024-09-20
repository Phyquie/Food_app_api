import express from 'express';
import { protectRoute2 } from '../middleware/protectRoute2.js';
import { addMenu,updateMenu,getActiveOrders,getPaymentHistory,updateOrderStatus } from '../controller/restaurant.controller.js';

const router = express.Router();

router.post('/addmenu',protectRoute2,addMenu);
router.post('/updatemenu/:id',protectRoute2,updateMenu);
router.get('/getactiveorders',protectRoute2,getActiveOrders);
router.get('/getpaymenthistory',protectRoute2,getPaymentHistory);
router.post('/updateorderstatus/:id',protectRoute2,updateOrderStatus);


export default router;