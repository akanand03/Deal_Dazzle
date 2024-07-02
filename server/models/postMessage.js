import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Specify the referenced model
    },
    tags: [String],
    selectedFile: String,
    price: Number, // Add a new field for the price
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
