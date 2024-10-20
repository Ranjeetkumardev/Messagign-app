 import express from 'express';
import { sendMessage, getMessages, replyToMessage,  } from "../controllers/messageController.js"
import { userAuth } from '../middlewares/Auth.js';
const messageRouter = express.Router();

messageRouter.post('/send',userAuth, sendMessage);
messageRouter.get('/:userId', userAuth,getMessages);
messageRouter.post('/:messageId/reply' ,userAuth, replyToMessage);

 export default messageRouter
