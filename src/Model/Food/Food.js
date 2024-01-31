import mongoose from "../index.js";

const schema=new mongoose.Schema({
    mail:String,
    foodName:{type:String,require:true},
    foodDesc:String,
    price:String,
    img_URL:String,
    quantity:String,
})