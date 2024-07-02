import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Typography } from "@material-ui/core";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useSpring, animated } from "react-spring";
import carImage from "./car2.png";
import useStyles from "./style";

const OrderSummary = () => {
  const { paymentId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/payment/order-details/${paymentId}`)
      .then((response) => {
        if (response.data) {
          setOrderDetails(response.data);
        } else {
          throw new Error("No data received");
        }
      })
      .catch((err) => {
        setError(err.response ? err.response.data.message : "Network or server error");
      })
      .finally(() => setLoading(false));
  }, [paymentId]);

  const orderSummaryAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className={classes.parentContainer}>
      <div className={classes.carContainer}>
        <img src={carImage} alt="Car" className={classes.car} />
      </div>
      <animated.div style={orderSummaryAnimation} className={classes.orderDetails}>
        <CheckCircleOutlineIcon className={classes.completionIcon} />
        <Typography variant="h3" gutterBottom>Order Summary</Typography>
        {orderDetails ? (
          <>
            <Typography variant="h6">Payment ID: {orderDetails.paymentId}</Typography>
            <Typography variant="h6">Order ID: {orderDetails.orderId}</Typography>
            <Typography variant="h6">Amount Paid: ₹{new Intl.NumberFormat("en-IN").format(orderDetails.amount / 100)} INR</Typography>
            <Typography variant="h6">Status: {orderDetails.status}</Typography>
            <Typography variant="h6" className={classes.deliveryHighlight}>
              Delivery Expected: 3-5 working days
            </Typography>
            <Typography variant="h6" className={classes.thankYouMessage}>Thank you for your purchase!</Typography>
          </>
        ) : (
          <Typography color="error">No order details available.</Typography>
        )}
      </animated.div>
    </div>
  );
};

export default OrderSummary;
