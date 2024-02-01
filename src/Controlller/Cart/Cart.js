import CartModel from "../../Model/AddToCart/Cart.js"
const AddCart=async(req,res)=>{

    try {
        let adddata=new CartModel({
            mail: req.body.mail,
            foodName: req.body.foodName,
            price: req.body.price,
            foodDesc: req.body.foodDesc,
            category: req.body.category,
            quantity: req.body.quantity,
            imageUrl: req.body.imageUrl,
            public_id: req.body.public_id
        })
        await adddata.save()
        

    } catch (error) {
        res.status(500).send({message:'data upload failed'})
    }
}
const getCartData=async(req,res)=>{
    // console.log(req.params.email);
    let cartRes= await CartModel.find({mail:req.params.email});

    try {
        if(cartRes){
            res.status(200).send({message:'cart fetched successfully',
              cartRes
          })
          }else{
              res.status(400).send({message:'No data found'})  
          }
    } catch (error) {
        res.status(500).send({message:'data fetched failed'})
    }
}
const deleteCartData=async(req,res)=>{
try {
   let dbRes=await CartModel.findOne({_id:req.params.id});
   if(dbRes){
    await dbRes.deleteOne();
    res.status(200).send({message:'data deleted Successfully'});
   }else{
    res.status(400).send({message:'no data found'});
   }
} catch (error) {
    res.status(500).send({message:error});

}
}
export default{AddCart,getCartData,deleteCartData}