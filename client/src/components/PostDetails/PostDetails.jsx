import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import LocalOfferIcon from "@material-ui/icons/LocalOffer"; // Add import for LocalOfferIcon

import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import useStyles from './styles';

const PostDetails = () => {
  const { post, posts, isLoading, error } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post?.tags) {
      dispatch(getPostsBySearch({ search: 'none', tags: post.tags.join(',') }));
    }
  }, [dispatch, post]);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <Typography>Error: {error.message}</Typography>
      </Paper>
    );
  }

  if (!post) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <Typography>No post found.</Typography>
      </Paper>
    );
  }

  const openPost = (_id) => history.push(`/posts/${_id}`);
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post.tags?.map((tag, index) => (
              <Link key={`${tag}-${index}`} to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                <LocalOfferIcon /> {/* Render LocalOfferIcon for each tag */}
                {` #${tag} `}
              </Link>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${post.creator?._id || 'unknown'}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${post.creator?.name || 'Unknown'}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes?.length}</Typography>
                <img src={selectedFile} width="200px" alt={title} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
