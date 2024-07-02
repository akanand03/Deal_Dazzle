import { makeStyles } from "@material-ui/core/styles";
import { indigo, grey, blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  parentContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "transparent",
  },
  carContainer: {
    width: "100%", // Ensure the car is visible and properly scaled
    textAlign: "center", // Center the car image horizontally
    padding: theme.spacing(4), // Space around the car image
  },
  car: {
    width: "500px", // Appropriately sized car image
    height: "auto",
    display: "block", // Ensure the image behaves as a block for centering
    margin: "0 auto", // Center the car image horizontally
    animation: "$drive 5s linear infinite", // Correct application of the animation
  },
  orderDetails: {
    position: "relative",
    backgroundColor: "#ffffff",
    color: grey[800],
    padding: theme.spacing(6),
    borderRadius: theme.spacing(2),
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
    width: "90%",
    maxWidth: "1200px",
    textAlign: "center",
    margin: theme.spacing(2),
  },
  deliveryHighlight: {
    fontSize: "20px",
    fontWeight: "bold",
    color: blue[600],
    backgroundColor: grey[100], // Subtle background highlight
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
    display: "inline-block", // Makes the background fit the text
  },
  completionIcon: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    color: theme.palette.primary.main,
    fontSize: "48px",
  },
  thankYouMessage: {
    fontSize: "32px",
    fontWeight: "bold",
    color: indigo[500],
    marginTop: theme.spacing(4),
  },
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(3),
    textAlign: "center",
    borderTop: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: "transparent",
  },
  "@keyframes drive": {
    "0%": { transform: "translateX(-100%)" }, // Start off-screen to the left
    "100%": { transform: "translateX(100%)" }, // End off-screen to the right
  },
}));

export default useStyles;
