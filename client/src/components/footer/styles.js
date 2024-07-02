import { makeStyles } from "@material-ui/core/styles";
import { deepPurple, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: deepPurple[50], // A light purple background for a unique footer
    color: grey[800],
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderTop: `1px solid ${grey[300]}`,
  },
  footerContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  footerSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(2),
    minWidth: "150px",
  },
  sectionTitle: {
    fontWeight: 700,
    color: deepPurple[900], // Dark purple for titles to make them stand out
    marginBottom: theme.spacing(1),
  },
  sectionContent: {
    textAlign: "center",
    color: grey[700],
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  footerBottom: {
    marginTop: theme.spacing(2),
    width: "100%",
    textAlign: "center",
    borderTop: `1px solid ${grey[200]}`,
    paddingTop: theme.spacing(2),
  },
}));

export default useStyles;
