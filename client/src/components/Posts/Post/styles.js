import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    width: "100%", // Set width to 100% for full width
    height: "100%", // Set height to 100% for full height
    position: "relative",
    backgroundImage: "linear-gradient(180deg, #6DD5FA 0%,#ffffff 100%)",
    maxWidth: "800px", // Increase the maxWidth to your desired value
    margin: "auto", // Center the card horizontally
    fontFamily: "Arial, sans-serif", // Change font family
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Add box shadow for depth
    transition: "transform 0.3s ease-in-out", // Add transition for hover effect
    "&:hover": {
      transform: "scale(1.05)", // Scale up on hover for an attractive effect
    },
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
    fontFamily: "Arial, sans-serif", // Change font family
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
    fontFamily: "Arial, sans-serif", // Change font family
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
    fontFamily: "Arial, sans-serif", // Change font family
  },
  title: {
    padding: "0 16px",
    fontFamily: "Arial, sans-serif", // Change font family
    fontSize: "1.5rem", // Increase font size
    fontWeight: "bold", // Make font bold
    color: "#333", // Change font color
    textDecoration: "none", // Remove underline
  },
  cardActions: {
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
});
