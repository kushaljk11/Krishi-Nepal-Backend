import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controller/productcontroller.js';

const productRouter = express.Router();

productRouter.post('/createproduct', createProduct);
productRouter.get('/products', getProducts);
productRouter.put('/products/:id', updateProduct);
productRouter.delete('/products/:id', deleteProduct);

export default productRouter;