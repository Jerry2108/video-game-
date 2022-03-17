import {Router} from 'express';
import {getCartItem, addCartItem, deleteCartItem,updateCartItem} from '../controllers/cartController.js';
import { deleteItem } from '../controllers/itemController.js';
const cartRouter = Router();
cartRouter.get('/cart/:userId', getCartItem);

//We add a new item into a user's cart. User ID is given as a parameter for us to search for their cart.
//Product ID will be given in the req.body so we will know which item to add into the cart. 
cartRouter.post('/cart/:userId', addCartItem);

cartRouter.delete('/cart/:userId/:productId', deleteCartItem);

cartRouter.put('/cart/:id', updateCartItem);

export default cartRouter; 