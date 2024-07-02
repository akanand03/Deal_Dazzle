import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const isAdmin = user?.result.isAdmin;
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState(""); // State for holding tags as a comma-separated string
  const history = useHistory();

  console.log("Query parameters:", page, searchQuery); // Log query parameters

  const searchPost = () => {
    console.log("Searching...");
    const tagsArray = tags.split(",").map((tag) => tag.trim()); // Convert the comma-separated string to an array of tags
    if (search.trim() || tagsArray.length > 0) {
      // Convert search input to lower case for case-sensitive comparison
      const caseSensitiveSearch = search.trim().toLowerCase();
      dispatch(getPostsBySearch({ search: caseSensitiveSearch, tags: tagsArray.join(",") }));
      history.push(
        `/posts/search?searchQuery=${caseSensitiveSearch || "none"}&tags=${tagsArray.join(",")}&page=${page}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  // Function to handle search on button click
  const handleSearchButtonClick = () => {
    searchPost();
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Best Deals"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <TextField
                name="tags"
                variant="outlined"
                label="Location"
                fullWidth
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <Button
                onClick={handleSearchButtonClick} // Call handleSearchButtonClick on button click
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            {isAdmin && (
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            )}
            {!searchQuery && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
