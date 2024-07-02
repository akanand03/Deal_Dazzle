import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Import all necessary components
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import Auth from "./components/Auth/Auth";
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag";
import Footer from "./components/footer/footer"; // Ensure correct file path and casing
import OrderSummary from "./components/OrdersSummary/summary"; // Assuming OrderSummary is a component

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <GoogleOAuthProvider clientId="1021986147883-l5m87q49h95fmh2ir9kd1kcgaj2dq9gd.apps.googleusercontent.com">
      <BrowserRouter>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <div style={{ flex: 1 }}>
            <Navbar />
            <Container
              maxWidth="xl"
              style={{ paddingTop: "20px", paddingBottom: "20px" }}
            >
              <Switch>
                <Route
                  path="/"
                  exact
                  component={() => <Redirect to="/posts" />}
                />
                <Route path="/posts" exact component={Home} />
                <Route path="/posts/search" exact component={Home} />
                <Route path="/posts/:id" exact component={PostDetails} />
                <Route
                  path={["/creators/:name", "/tags/:name"]}
                  component={CreatorOrTag}
                />
                <Route
                  path="/auth"
                  exact
                  component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
                />
                <Route
                  path="/order-summary/:paymentId"
                  exact
                  component={OrderSummary}
                />
              </Switch>
            </Container>
          </div>
          <Footer style={{ flexShrink: 0 }} /> {/* Fix position to the bottom */}
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
