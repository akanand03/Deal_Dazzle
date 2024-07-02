import express from 'express';
import { getPosts, getPostsBySearch, getPostsByCreator, getPost, createPost, updatePost, likePost, commentPost, deletePost } from '../controllers/posts.js';
import auth from "../middleware/auth.js";

// Define checkId function
const checkId = (req, res, next, id) => {
  // Check if id is valid or exists in your database
  // For example, you can check if it's a valid ObjectId or some other criteria
  if (!isValidId(id)) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  // If id is valid, attach it to the request object and call next
  req.id = id;
  next();
};

// Example function to check if id is valid
const isValidId = (id) => {
  // Implement your validation logic here
  // For example, you can use a library like mongoose.Types.ObjectId.isValid(id)
  // Or perform some other validation
  return true; // For demonstration purposes, always return true
};

const router = express.Router();

router.param('id', checkId); // Use checkId as parameter handler for 'id'

router.get('/creator', getPostsByCreator);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', commentPost);

export default router;
