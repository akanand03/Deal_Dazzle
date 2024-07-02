import { makeStyles } from "@material-ui/core/styles";
import { deepPurple, indigo } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    background: `linear-gradient(to bottom, ${indigo[100]} 0%, ${theme.palette.common.white} 100%)`, // Light indigo to white gradient
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  heading: {
    color: deepPurple[700], // Darker purple for emphasis and contrast
    textDecoration: "none",
    fontSize: "3em",
    fontWeight: 600,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      fontSize: "2em",
    },
  },
  image: {
    marginLeft: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
    },
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: theme.spacing(4),
      justifyContent: "center",
    },
  },
  logout: {
    marginLeft: theme.spacing(2),
  },
  userName: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  signInButton: {
    borderRadius: theme.spacing(6),
  },
}));

export default useStyles;
