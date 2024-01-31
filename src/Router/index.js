import express from 'express';
import userRoute from './UserRouter/User.js';
import Forget from './Forget/Forget.js'
const route=express();
route.use('/',userRoute);
route.use('/forgetpass',Forget)
export default route;
