import express from 'express';
import Cart from '../../Controlller/Cart/Cart.js';
// const storage=multer.diskStorage({
    
//     filename:function(req,file,cb){
//         return cb(null,`${Date.now()}_${file.originalname}`)
//     }
// })
// const upload=multer({storage})

const route=express()
route.post('/savcart',Cart.AddCart);
route.get('/getcartdata/:email',Cart.getCartData);
route.delete('/deletecart/:id',Cart.deleteCartData)
export default route