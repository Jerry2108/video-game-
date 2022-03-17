import {Router}  from "express";
import {getOrders, checkout} from '../controllers/orderController.js';

const orderRouter = Router();

//This request fetches all orders the given user has made.
orderRouter.get('/order/:userId', getOrders);

//This request checkout for the current user. 
orderRouter.post('/order/:userId', checkout);

export default orderRouter;
