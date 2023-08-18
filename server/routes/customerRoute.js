import express from 'express';
const router = express.Router();
import  {createCustomer, 
    deleteAcustomer, 
    getAcustomer, 
    getAllCustomer, 
    updateAcustomer}  from '../controllers/customerController.js';

router.post('/:enterpriseName/addCustomer',createCustomer);
router.get('/:enterpriseName/getAllCustomer',getAllCustomer);
router.get('/:enterpriseName/:email',getAcustomer);
router.put('/:enterpriseName/:email/update',updateAcustomer);
router.delete('/:enterpriseName/:email/delete',deleteAcustomer);



export default router;