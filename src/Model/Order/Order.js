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
    public_id:String,
    orderBy:String
},{
    versionKey:false
})
const OrderModel=mongoose.model('order',schema);
export default OrderModel