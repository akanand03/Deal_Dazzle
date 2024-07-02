import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const createOrder = async (amount) => {
  try {
    const result = await axios.post(
      "http://localhost:3001/payment/create-order",
      { amount }
    );
    return result.data;
  } catch (error) {
    console.error("There was an error creating the order: ", error);
    alert("Failed to create order. Check console for more details.");
    throw error;
  }
};

const RazorpayButton = ({ amount, isSeller }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleBuyNow = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const orderData = await createOrder(amount);

    const options = {
      key: "rzp_test_4E5ZrpYhNWR2ti",
      amount: orderData.amount,
      currency: "INR",
      name: "Deal Dazzle",
      description: "Product Purchase",
      image: "/your-company-logo.png",
      order_id: orderData.orderId,
      handler: function (response) {
        const paymentId = response.razorpay_order_id;
        dispatch({ type: "PURCHASE_SUCCESS", payload: response });
        history.push(`/order-summary/${paymentId}`);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "Customer Address",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  // Render the button only if the user is not a seller
  return !isSeller ? (
    <Button variant="contained" color="primary" onClick={handleBuyNow}>
      Buy Now
    </Button>
  ) : null;
};

export default RazorpayButton;
