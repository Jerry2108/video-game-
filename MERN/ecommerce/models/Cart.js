import mongoose from "mongoose";

const schema = mongoose.Schema;
const CartSchema = new schema({
  userId: {
    type: String,
  },
  items: [
    {
      productId: {
        type: String,
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
        default:1
      },
      price: Number,
      picture: {
          type: String,
          required: true}
    
    },
  ],
  bill: {
    type: Number,
    required: true,
    default: 0,
  },
});
const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
