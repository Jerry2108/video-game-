
import Order from '../models/Order.js';
import User from '../models/User.js';
import Cart from '../models/Cart.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

export const getOrders = async (req,res)=>{
    let orders = await Order.find(req.params.userId);
    let sortedOrders = await Orders.sort({date:-1});
    return res.send(sortedOrders);
}

//check out 
export const checkout = async (req,res)=>{
    try{
         //we get user id 
    const userId = req.params.userId; 

    //We get user and their card.
    const user = await User.findById(userId);
    const cart = await Cart.findOne({userId});

    //We set up a stripe API instance. 
    const stripe = Stripe(process.env.STRIPE_API_KEY);

    //We get source from the request's body.
    const {source} = req.body; 

    if (!cart){
        return res.status(404).send({msg: "You do not have items in this cart"});
    }

    //create a charge using Stripe
    let charge = await stripe.charges.create({
        source, 
        amount: cart.bill, 
        currency: "aud",
        receipt_email: user.email
    });

    //The unsuccessful payment
    if (!charge){
        throw error('Payment failed'); 
    }

    //The successful payment -> new order is created
    const order = await Order.create({
        userId: userId,
        items: cart.items,
        bill: cart.bill
    })

    //delete the cart. 
    const deletedCart = await Cart.deleteOne({userId});
    return res.status(201).send(order);
    }
   
    catch(errors){
        console.log(errors);
        res.status(500).send({msg: "Something went wrong"});
    }
}


