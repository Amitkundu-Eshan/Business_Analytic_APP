import express from 'express';
const router = express.Router();
import { createProduct, getAProduct, getAllProduct, updateProduct } from '../controllers/productController.js';

router.post('/:enterpriseName/createProduct',createProduct);
router.get('/:enterpriseName/products',getAllProduct);
router.put('/:enterpriseName/updateProduct/:productName',updateProduct);
router.get('/:enterpriseName/getAProduct/:productName',getAProduct);

export default router;