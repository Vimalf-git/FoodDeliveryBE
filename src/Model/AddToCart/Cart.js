import mongoose from "../index.js";

const schema=new mongoose.Schema({
    mail:String,
    foodName:{type:String,require:true},
    foodDesc:String,
    price:String,
    quantity:String,
    category:String,
    veg:Boolean,
    imageUrl: { type: String },
    public_id:String
},{
    versionKey:false

})
const CartModel=mongoose.model('cart',schema);
export default CartModel