// paymentRoutes.js
import express from 'express';
import { createOrder, getOrderDetails } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/order-details/:paymentId', getOrderDetails);

export default router;
