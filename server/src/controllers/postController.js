
import Post from '../models/Post.js';

// Create a post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({ title, content, author: req.user._id });
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;

    const post = await Post.findOneAndUpdate(
      { _id: postId, author: req.user._id },
      { title, content },
      { new: true }
    );

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post updated", post });
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOneAndDelete({ _id: postId, author: req.user._id });

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err });
  }
};
