import express from 'express';
import { buyProduct } from '../controller/buycontroller.js';

const buyrouter = express.Router();

buyrouter.post('/buy', buyProduct);

export default buyrouter;
