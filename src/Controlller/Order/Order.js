import OrderModel from "../../Model/Order/Order.js"

const getOrderData=async(req,res)=>{
    try {
        console.log(req.params.email);
       let resData= await OrderModel.find({mail:req.params.email});
       console.log(resData);
       if(resData){
        res.status(200).send({message:'fetched successfully',orders:resData});
       }else{
        res.status(400).send({message:'no data found'});
       }
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}

export default{getOrderData}