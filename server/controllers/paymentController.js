import Razorpay from "razorpay";
import PaymentModel from "../models/paymentModel.js";

// Setup Razorpay instance with API credentials
const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY_ID || "rzp_test_4E5ZrpYhNWR2ti",
  key_secret: process.env.RZP_KEY_SECRET || "ZEYk93BapnoQurNePuU3ltYN",
});

// API to create an order in Razorpay and save the order details in the database
export const createOrder = async (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount provided." });
  }

  const options = {
    amount: amount * 100, // converting to paisa
    currency: "INR",
    receipt: `receipt_${new Date().getTime()}`,
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    const payment = new PaymentModel({
      orderId: response.id, // Save Razorpay order ID
      paymentId: response.id, // Initially empty, to be updated when payment is confirmed
      amount: response.amount,
      currency: response.currency,
      status: "created",
    });
    await payment.save();

    res.json({
      orderId: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.error("Error in creating Razorpay order: ", error);
    res.status(500).json({ error: error.message });
  }
};

// API to retrieve payment details by paymentId
export const getOrderDetails = async (req, res) => {
  const { paymentId } = req.params;
  console.log("Retrieving details for paymentId:", paymentId); // Debugging output

  try {
    const paymentDetails = await PaymentModel.findOne({ paymentId: paymentId });
    if (!paymentDetails) {
      console.log("No details found for paymentId:", paymentId); // More debugging output
      return res.status(404).json({ message: "Payment details not found" });
    }
    res.status(200).json(paymentDetails);
  } catch (error) {
    console.error("Error retrieving payment details: ", error);
    res
      .status(500)
      .json({ message: "Error retrieving payment details", error });
  }
};
