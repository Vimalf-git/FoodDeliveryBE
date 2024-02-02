import express from 'express'
import Order from "../../Controlller/Order/Order.js";
import Auth from '../../Common/Auth/Auth.js';

const route =express();


route.get('/getallorder/:email',Auth.validate,Order.getOrderData);

export default route