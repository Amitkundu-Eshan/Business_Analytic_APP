import express from 'express';
const router = express.Router();
import  {RegisterEnterprise,getByEnterpriseName,loginEnterprise}  from '../controllers/enterpriseController.js';

router.post('/registerEnterprise',RegisterEnterprise);
router.get('/loginEnterprise',loginEnterprise);
router.get('/:enterpriseName',getByEnterpriseName);

export default router;