import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    justifyContent: "flex-start", // Align items to the left
  },
  appBarSearch: {
    borderRadius: 20,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
    backgroundImage:
      "linear-gradient(to top, #6DD5FA 0%, #fffff1 60%, #ffffff 100%)",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  searchButton: {
    backgroundColor: "#3f51b5",
    borderRadius: "30px",
    color: "white",
    marginLeft: "0rem",
    marginTop: "1rem",
    alignSelf: "center", // Align button to the center horizontally
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
}));
