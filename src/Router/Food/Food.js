import express from 'express';
import foodAdd from '../../Controlller/Food/Food.js'
import multer from "multer";

const storage=multer.diskStorage({
    
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload=multer({storage})

const route=express()
route.post('/addfood',upload.single('file'),foodAdd.foodAdd);
route.get('/getfooddata',foodAdd.getFoodDetails);
route.delete('/deletefood/:id',foodAdd.deleteFoodDetail)
route.get('/editData/:id',foodAdd.getEditData)
route.put('/updatedata',upload.single('updatefile'),foodAdd.UpdateFoodMenu)
export default route