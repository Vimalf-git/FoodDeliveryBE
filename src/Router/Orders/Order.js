import express from 'express'
import Order from "../../Controlller/Order/Order.js";

const route =express();


route.get('/getallorder/:email',Order.getOrderData);

export default route