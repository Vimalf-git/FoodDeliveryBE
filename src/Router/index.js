import express from 'express';
import userRoute from './UserRouter/User.js';
import Forget from './Forget/Forget.js'
import Food from './Food/Food.js'
import cart from './Cart/Cart.js'
const route=express();
route.use('/',userRoute);
route.use('/forgetpass',Forget)
route.use('/',Food)
route.use('/',cart)
export default route;
