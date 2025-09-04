import express from 'express';
import { buyProduct } from '../controller/transactioncontroller.js';
const transaction  = express.Router();

transaction.post('/buy', buyProduct);

export default transaction;
