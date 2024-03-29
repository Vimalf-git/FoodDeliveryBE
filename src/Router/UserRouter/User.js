import express from 'express';
import UserCreate from '../../Controlller/UserController/UserCreate.js'
import Login from '../../Controlller/UserController/Login.js'
import multer from 'multer';
import Auth from '../../Common/Auth/Auth.js';
const route=express();

const storage=multer.diskStorage({
    
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload=multer({storage})

route.post('/createuser',UserCreate.create)
route.post('/login',Login.Login)
route.get('/getuserlist',UserCreate.getUserList)
route.put('/updateprofile',upload.single('profilePic'),UserCreate.updateUserInfo)
route.get('/getUser/:email',Auth.validate,UserCreate.getuser)
export default route;