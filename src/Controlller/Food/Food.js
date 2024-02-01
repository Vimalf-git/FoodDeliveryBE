import FoodModel from "../../Model/Food/Food.js"
import cloudnary from 'cloudinary'

const foodAdd = async (req, res) => {
    // console.log(req);
    cloudnary.config({
        cloud_name: "dfjc0pkpp",
        api_key: "588969669952431",
        api_secret: "SaArGafJGobXIJzjmYNoAKwaEY8"
    })
    try {
        if (req.file) {
            const result = await cloudnary.v2.uploader.upload(req.file.path)
            // console.log('enter');
            // console.log(result);
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
                mail: req.body.mail,
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
        res.status(500).send({ message: 'post failed..!' })

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
        // console.log('gfhj');
        // console.log(req.params.id);
        let resData = await FoodModel.findOne({ _id: req.params.id });
        // console.log(resData);
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

const UpdateFoodMenu=async(req,res)=>{
    console.log('update');
    console.log(req.body);
    cloudnary.config({
        cloud_name: "dfjc0pkpp",
        api_key: "588969669952431",
        api_secret: "SaArGafJGobXIJzjmYNoAKwaEY8"
    })
    try {
     let resDb=   await FoodModel.findOne({_id:req.body.id})
     console.log(resDb);
     if(resDb){
        if (req.file) {
            const result = await cloudnary.v2.uploader.upload(req.file.path)
            
            resDb.mail= req.body.email,
            resDb.foodName= req.body.foodName,
            resDb.price= req.body.price,
            resDb.foodDesc= req.body.foodDesc,
            resDb.category= req.body.category,
            resDb.quantity= req.body.quantity,
            resDb.imageUrl= result.url,
            resDb.public_id= result.public_id
            await resDb.save()
        } else {

            // const newImage = new FoodModel({
            //     mail: req.body.mail,
            //     foodName: req.body.foodName,
            //     price: req.body.price,
            //     foodDesc: req.body.foodDesc,
            //     category: req.body.category,
            //     quantity: req.body.quantity,
            // })
            resDb.mail= req.body.email,
            resDb.foodName= req.body.foodName,
            resDb.price= req.body.price,
            resDb.foodDesc= req.body.foodDesc,
            resDb.category= req.body.category,
            resDb.quantity= req.body.quantity,
            // resDb.imageUrl= req.body,
            // resDb.public_id= result.public_id
            await resDb.save()
        }
        res.status(200).send({ message: 'post saved successfully' })
    }
    } catch (error) {
        res.status(500).send({ message: 'post failed..!' })

    }
}
export default { foodAdd, getFoodDetails, deleteFoodDetail, getEditData,UpdateFoodMenu }