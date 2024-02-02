import FoodModel from "../../Model/Food/Food.js"
import cloudnary from 'cloudinary'
import { v4 } from "uuid"
import Stripe from "stripe"
import OrderModel from "../../Model/Order/Order.js"
import CartModel from "../../Model/AddToCart/Cart.js"
import mongoose, { mongo } from "mongoose"
Stripe(
    "sk_test_51OfEMqSBn9kdrzehcWKjMC7D59YURudCowaHO3wShGGn4YOGPbpm9SXbU9sQTN1YVzX3iZuRFjt91WdRylVKhpC700NUTI4ysh")
const foodAdd = async (req, res) => {
    cloudnary.config({
        cloud_name: "dfjc0pkpp",
        api_key: "588969669952431",
        api_secret: "SaArGafJGobXIJzjmYNoAKwaEY8"
    })
    try {
        if (req.file) {
            const result = await cloudnary.v2.uploader.upload(req.file.path)
            const newImage = new FoodModel({
                mail: req.body.email,
                foodName: req.body.foodName,
                price: req.body.price,
                foodDesc: req.body.foodDesc,
                category: req.body.category,
                quantity: req.body.quantity,
                imageUrl: result.url,
                public_id: result.public_id
            })
            await newImage.save()
        } else {
            const newImage = new FoodModel({
                mail: req.body.email,
                foodName: req.body.foodName,
                price: req.body.price,
                foodDesc: req.body.foodDesc,
                category: req.body.category,
                quantity: req.body.quantity,
            })
            await newImage.save()
        }
        res.status(200).send({ message: 'post saved successfully' })
    } catch (error) {
        res.status(500).send({ message: error.message })

    }
}
const getFoodDetails = async (req, res) => {
    try {
        const data = await FoodModel.find();
        if (data) {
            res.status(200).send({ message: 'data fetch successfully', fooddetail: data })
        } else {
            res.status(200).send({ message: 'data fetch failed!' })

        }
    } catch (error) {
        res.status(500).send({ message: error })

    }
}
const deleteFoodDetail = async (req, res) => {
    try {
        let check = await FoodModel.findOne({ _id: req.params.id });
        if (check) {
            await check.deleteOne();
            res.status(200).send({ message: 'deleted successfully' })
        } else {
            res.status(400).send({ message: 'no data found' })
        }
    } catch (error) {
        res.status(500).send({ message: error })
    }
}
const getEditData = async (req, res) => {
    try {
        let resData = await FoodModel.findOne({ _id: req.params.id });
        if (resData) {
            res.status(200).send({ message: 'data fetched', editData: resData })
        }
        else {
            res.status(200).send({ message: 'no data found' })
        }
    } catch (error) {
        res.status(500).send({ message: error })

    }
}

const UpdateFoodMenu = async (req, res) => {
    cloudnary.config({
        cloud_name: "dfjc0pkpp",
        api_key: "588969669952431",
        api_secret: "SaArGafJGobXIJzjmYNoAKwaEY8"
    })
    try {
        let resDb = await FoodModel.findOne({ _id: req.body.id })
        if (resDb) {
            if (req.file ) {
                if(req.size<10485760){
                const result = await cloudnary.v2.uploader.upload(req.file.path)
                resDb.mail = req.body.email,
                    resDb.foodName = req.body.foodName,
                    resDb.price = req.body.price,
                    resDb.foodDesc = req.body.foodDesc,
                    resDb.category = req.body.category,
                    resDb.quantity = req.body.quantity,
                    resDb.imageUrl = result.url,
                    resDb.public_id = result.public_id
                await resDb.save();
                }else{
                    res.status(200).send({message:'your size to large '});
                }
            } else {
                // const newImage = new FoodModel({
                //     mail: req.body.mail,
                //     foodName: req.body.foodName,
                //     price: req.body.price,
                //     foodDesc: req.body.foodDesc,
                //     category: req.body.category,
                //     quantity: req.body.quantity,
                // })
                resDb.mail = req.body.email,
                    resDb.foodName = req.body.foodName,
                    resDb.price = req.body.price,
                    resDb.foodDesc = req.body.foodDesc,
                    resDb.category = req.body.category,
                    resDb.quantity = req.body.quantity,
                    await resDb.save()
            }
            res.status(200).send({ message: 'post saved successfully' })
        }
    } catch (error) {
        res.status(500).send({ message:error.message })
    }
}
const paymentToken = async (req, res) => {
    try {
        const { token, addToCartData,totalbillAmt } = req.body
        let removeIds=[];
          addToCartData.forEach((e)=>{
            removeIds.push(new mongoose.Types.ObjectId(e._id))            
        })


        await CartModel.deleteMany({_id:{$in:removeIds}});
        await addToCartData.forEach((e)=>{
        let orderData=new OrderModel({
            mail:e.mail,
            foodName:e.foodName,
            foodDesc:e.foodDesc,
            price:e.price,
            quantity:e.quantity,
            category:e.category,
            imageUrl:e.imageUrl,
            public_id:e.public_id,
            orderBy:e.cartBy
        })
        
        orderData.save();
        })
       
res.status(200).send({message:'transaction complited'})

        // const transaction = v4()
        // return Stripe.customers.create({
        //     email:token.email,
        //     source:token.id
        // }).then((customer)=>{
        //     Stripe.charges.create({
        //         amount:totalbillAmt,
        //         currency:'inr',
        //         customer:customer.id,
        //         receipt_email:token.email,
        //         description:'your food delivered shortly'
        //     }).then((result)=>{
        //         res.json(result);
        //     }).catch((err)=>{
        //         console.log(err);
        //     })
        // })
    } catch (error) {

    }
}
export default { foodAdd, getFoodDetails, deleteFoodDetail, getEditData, UpdateFoodMenu, paymentToken }