
import express from 'express';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/postController.js';
import { userAuth } from '../middlewares/Auth.js';
 

const postRouter = express.Router();

// Protected routes for posts
postRouter.post('/post', userAuth, createPost);
postRouter.get('/', userAuth, getPosts);
postRouter.put('/:postId', userAuth, updatePost);
postRouter.delete('/:postId', userAuth, deletePost);

export default postRouter;
