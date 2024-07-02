import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

const router = express.Router();

// Middleware to check if ID is valid for operations requiring ID
const checkId = (req, res, next, id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }
    next();
};

// Get paginated posts
export const getPosts = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
    
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: "Unable to fetch posts", error: error.message });
    }
};

// Get posts by search
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.status(200).json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: "Failed to find posts by search", error: error.message });
    }
};

// Get posts by creator
export const getPostsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const posts = await PostMessage.find({ name }).populate('creator', 'name');
        res.status(200).json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: "Failed to find posts by creator", error: error.message });
    }
};

// Get a single post with populated creator details
export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id).populate('creator', 'name email');
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        console.error("Error finding post:", error);
        res.status(404).json({ message: "Post not found", error: error.message });
    }
};

// Create a post
export const createPost = async (req, res) => {
    const { title, message, tags, selectedFile, price } = req.body;

    // Validate input data
    if (!title || !message || !tags) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newPostMessage = new PostMessage({
            title,
            message,
            creator: req.userId, // Assign creator to the user's ID
            tags,
            selectedFile,
            price,
            createdAt: new Date().toISOString(),
        });

        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        console.error('Failed to create post:', error);
        res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
};

// Update a post
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags, price } = req.body; // Extract price from request body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { creator, title, message, tags, selectedFile, price, _id: id }, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: "Failed to update post", error: error.message });
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try {
        await PostMessage.findByIdAndRemove(id);
        res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete post", error: error.message });
    }
};

// Like a post
export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(400).json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    try {
        const post = await PostMessage.findById(id);
        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: "Failed to like post", error: error.message });
    }
};

// Comment on a post
export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    try {
        const post = await PostMessage.findById(id);
        post.comments.push(value);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: "Failed to comment on post", error: error.message });
    }
};

export default router;
