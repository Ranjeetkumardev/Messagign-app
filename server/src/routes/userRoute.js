import express from 'express';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  updateUser, 
  deleteUser, 
  getUserByUserId, 
  getAllUsers,
} from '../controllers/userController.js';
import { userAuth } from '../middlewares/Auth.js';

const userRouter = express.Router();

// User routes
userRouter.post('/signup', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', userAuth, logoutUser);
userRouter.patch('/profile', userAuth, updateUser);
userRouter.delete('/profile', userAuth, deleteUser);
userRouter.get('/getallusers', userAuth ,getAllUsers);
userRouter.get('/:_id', userAuth,getUserByUserId); 


export default userRouter;

 