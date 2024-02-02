import express from 'express';
import Cart from '../../Controlller/Cart/Cart.js';
import Auth from '../../Common/Auth/Auth.js';
// const storage=multer.diskStorage({
    
//     filename:function(req,file,cb){
//         return cb(null,`${Date.now()}_${file.originalname}`)
//     }
// })
// const upload=multer({storage})

const route=express()
route.post('/savcart',Cart.AddCart);
route.get('/getcartdata/:email',Auth.validate,Cart.getCartData);
route.delete('/deletecart/:id',Cart.deleteCartData)
export default route