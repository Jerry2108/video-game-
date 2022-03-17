import Cart from '../models/Cart.js';
import Item from '../models/Item.js';
import User from '../models/User.js';

export const getCartItem = async (req, res)=>{
    try{
        let userId = req.params.userId;
        let cart = await Cart.findOne({userId});

        if(!cart){
            cart = Cart.create({
                userId,
                items:[],
                bill:0
            });
            cart = await cart.save();
        }
        return res.send(cart);
    }
    catch(errors){
        console.log(errors);
        res.status(500).send({msg: 'Something went wrong'});
    }
}

//We delete cart for a given user.
export const deleteCartItem = async(req, res)=>{
    try{
       
        const userId = req.params.userId; 
        const productId = req.params.productId; 
        console.log(userId);
        //find cart for a given user
        let cart = await Cart.findOne({userId: userId});

        if (!cart){
            return res.status(404).json({msg: 'This user does not have any carts'});
        }

        //find all items from a found cart
        let itemIndex = cart.items.findIndex(p => p.productId == productId);
        if(itemIndex > -1)
        {
            let productItem = cart.items[itemIndex];
            cart.bill -= productItem.quantity*productItem.price;
            //remove 1 item at the found index
            cart.items.splice(itemIndex,1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    }
    catch (errors) {
        console.log(errors);
        res.status(500).send("Something went wrong");
    }
}

//We add items (quantity is provided) into a user's cart. 
export const addCartItem = async (req, res)=>{
    try{
        
        const userId = req.params.userId; 

        const {productId, quantity} = req.body; 

        //search for a user's cart. 
        let cart = await Cart.findOne({userId});

         //get the new item
         const newItem  = await Item.findById(productId);
        
         //get the new item's price
         const price = newItem.price;

        //get the new item's name
        const name = newItem.title;

        const picture = newItem.image;
        console.log(picture);
        // if card doesnt exist, create one. 
        if (!cart){
            const newCart = await Cart.create({
                userId,
                items:  [{ productId, name, quantity, price, picture }],
                bill: quantity*price
            })
            return res.status(201).send(newCart);
        }
        else{
            const itemIndex = cart.items.findIndex(p => p.productId == productId)

            //if that type of item has already been exisiting in the cart. 
            if (itemIndex > -1){
                let foundItem = cart.items[itemIndex];
                foundItem.quantity += quantity;
            }

            else{
                //add items to the items list
                cart.items.push({productId, price, quantity, name, picture});
            }

             //update the bill
             cart.bill += quantity*price;
            cart = await cart.save();
            return res.status(201).send(cart);
        }
    }
    catch(errors){
        console.log(errors);
        res.status(500).send({msg: "Something went wrong"});
    }


}

export const updateCartItem = async(req,res)=>{
    
        const userId = req.params.id;
        const { productId, qty } = req.body;
    
        try{
            let cart = await Cart.findOne({userId});
            let item = await Item.findOne({_id: productId});
    
            if(!item)
                return res.status(404).send('Item not found!'); // not returning will continue further execution of code.
            
            if(!cart)
              return res.status(400).send("Cart not found");
            else{
                // if cart exists for the user
                let itemIndex = cart.items.findIndex(p => p.productId == productId);
    
                // Check if product exists or not
                if(itemIndex == -1)
                  return res.status(404).send('Item not found in cart!');
                else {
                    let productItem = cart.items[itemIndex];
                    productItem.quantity = qty;
                    cart.items[itemIndex] = productItem;
                }
                cart.bill = cart.items.reduce((sum, item) => sum + item.price * item.quantity,0);
                cart = await cart.save();
                return res.status(201).send(cart);
            }     
        }
        catch (err) {
            // just printing the error wont help us find where is the error. Add some understandable string to it.
            console.log("Error in update cart", err);
            res.status(500).send("Something went wrong");
        }
    }
    
