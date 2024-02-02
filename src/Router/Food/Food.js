import express from 'express';
import foodAdd from '../../Controlller/Food/Food.js'
import multer from "multer";
import Auth from '../../Common/Auth/Auth.js';

const storage=multer.diskStorage({
    
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload=multer({storage})

const route=express()
route.post('/addfood',upload.single('file'),foodAdd.foodAdd);
route.get('/getfooddata',Auth.validate,foodAdd.getFoodDetails);
route.delete('/deletefood/:id',foodAdd.deleteFoodDetail)
route.get('/editData/:id',foodAdd.getEditData)
route.put('/updatedata',upload.single('file'),foodAdd.UpdateFoodMenu)
route.post('/paymenttoken',foodAdd.paymentToken);
export default route