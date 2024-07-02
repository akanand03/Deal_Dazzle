import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { LOGOUT } from "../../constants/actionTypes";

import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/d.png";
import useStyles from "./styles";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/auth");
    localStorage.clear(); // Clearing localStorage upon logout
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const getInitials = (name) => {
    return name ? name.charAt(0) : "U";
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="46px" />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="icon"
          height="50px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result?.name || "User"}
              src={user.result?.imageUrl}
            >
              {getInitials(user.result?.name)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result?.name || "No Name Available"}
            </Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
