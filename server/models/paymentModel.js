// models/paymentModel.js
import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({
  paymentId: String,
  orderId: String,
  amount: Number,
  currency: String,
  status: String,
});

const PaymentModel = mongoose.model('Payment', paymentSchema);
export default PaymentModel;
