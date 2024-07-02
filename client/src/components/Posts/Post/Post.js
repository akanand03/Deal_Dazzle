import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import LocalOfferIcon from "@material-ui/icons/LocalOffer"; // Import LocalOfferIcon
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Confetti from "react-confetti";
import { likePost, deletePost } from "../../../actions/posts";
import useStyles from "./styles";
import jwtDecode from "jwt-decode";
import RupeeLogo from "../../../images/rupee.png";
import RazorpayButton from "../../razorpay-btn/razorpay";

const Post = ({ post, setCurrentId }) => {
  if (!post) return null;

  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post.likes || []);
  const [couponCode, setCouponCode] = useState("");
  const [openCoupon, setOpenCoupon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  let decodedToken = user?.token ? jwtDecode(user?.token) : null;
  let userId = decodedToken?.sub || user?.result?._id;
  const isAdmin = user?.result?.isAdmin;

  if (isAdmin && post.creator !== userId) {
    return null;
  }

  const handleLike = () => {
    dispatch(likePost(post._id));
    setLikes((prevLikes) => {
      if (prevLikes.includes(userId)) {
        return prevLikes.filter((id) => id !== userId);
      } else {
        return [...prevLikes, userId];
      }
    });
  };

  const Likes = () => {
    const likeCount = likes?.length || 0;
    const userLiked = likes?.includes(userId);

    if (likeCount > 0) {
      return (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{userLiked ? "You" : ""}{" "}
          {userLiked && likeCount > 1 ? " and " : ""}{" "}
          {likeCount - (userLiked ? 1 : 0)}{" "}
          {likeCount === 1 ? "other" : "others"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  const generateCoupon = () => {
    if (isAdmin || !user?.result) {
      alert("Only non-admin logged-in users can generate coupons.");
      return;
    }
    const adjectives = ["Funky", "Groovy", "Radical", "Awesome"];
    const nouns = ["Deal", "Discount", "Savings", "Offer"];
    const randomNumber = Math.floor(Math.random() * 100);
    const randomCoupon = `${
      adjectives[Math.floor(Math.random() * adjectives.length)]
    }${
      nouns[Math.floor(Math.random() * nouns.length)]
    }${randomNumber}`.toUpperCase();
    setCouponCode(randomCoupon);
    setOpenCoupon(true);
  };

  const copyCoupon = () => {
    navigator.clipboard
      .writeText(couponCode)
      .then(() => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        setOpenCoupon(false);
        alert("Coupon code copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy coupon code:", error);
        alert("Failed to copy coupon code. Please try again.");
      });
  };

  const handleCouponClose = () => {
    setOpenCoupon(false);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(userId === post?.creator ||
          (isAdmin && userId === post?.creator)) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              style={{ color: "white" }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="div">
            {post.tags?.map((tag, index) => (
              <LocalOfferIcon key={index} />
            ))}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message
              ? post.message.split(" ").splice(0, 20).join(" ") + "..."
              : "No description available."}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong style={{ fontSize: "1.2rem" }}>Price:</strong>
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              <img
                src={RupeeLogo}
                alt="Rupee Logo"
                style={{ height: "0.8rem" }}
              />
              {post.price || "N/A"}
            </span>
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {userId === post?.creator && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        )}
        {!isAdmin && user?.result && (
          <Button size="small" color="primary" onClick={generateCoupon}>
            <LocalOfferIcon /> {/* Render LocalOfferIcon for coupon generation */}
          </Button>
        )}
      </CardActions>
      {!isAdmin && user?.result && <RazorpayButton amount={post.price} />}
      <Dialog
        open={openCoupon}
        onClose={handleCouponClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Coupon</DialogTitle>
        <DialogContent>
          <Typography variant="h5" gutterBottom>
            {couponCode}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={copyCoupon} color="primary">
            Copy Coupon
          </Button>
          <Button onClick={handleCouponClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </Card>
  );
};

export default Post;
