 import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/database.js';
import User from './src/models/User.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import cors from "cors"
import { storage } from './storage/storage.js';
import userRouter from './src/routes/userRoute.js';
import { userAuth } from './src/middlewares/Auth.js';
import messageRouter from './src/routes/messageRoutes.js';
import postRouter from './src/routes/postRoutes.js';
import Message from './src/models/Message.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ storage });

// Create HTTP and Socket.io server
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (for development, restrict in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies/authorization headers 
  }
});
 

// Enable CORS for all routes and all origins
app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow cookies/authorization headers
}));

// Routes
app.use("/api/users", userRouter);
app.use('/api', postRouter);
app.use("/api/messages", messageRouter);

app.get("/api/auth", userAuth, (req, res) => {
  res.status(200).json({ message: "Authenticated" });
});

// Image upload endpoint
app.post('/api/upload', userAuth, upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file.path;
    const userId = req.user._id; // Assuming user is authenticated

    // Save the image URL to the user's profile in MongoDB
    await User.findByIdAndUpdate(userId, { profilePicture: imageUrl });

    res.status(200).json({ imageUrl });
  } catch (error) {             
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Hello universe");
});

// Socket.io middleware for JWT authentication
io.use(async (socket, next) => {
  const token = socket.handshake.headers.cookie?.split('=')[1];
  if (!token) return next(new Error('Authentication error'));

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded._id;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`User connected log: ${socket.userId}`);

  socket.on('sendMessage', async ({ content, receiverId, replyTo }) => {
    try {
      const newMessage = new Message({ content, sender: socket.userId, receiver: receiverId, replyTo });
      await newMessage.save();
      io.to(receiverId).emit('newMessage', newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });
 

  socket.on('fetchMessages', async ({ userId }) => {
    console.log("User ID:", userId);
    console.log("Socket User ID:", socket.userId);
  
    try {
      // Ensure both sender and receiver IDs are valid ObjectId
      if (!isValidObjectId(socket.userId) || !isValidObjectId(userId)) {
        console.log("Invalid ObjectId format for sender or receiver");
        socket.emit('error', { message: "Invalid sender or receiver ID" });
        return;
      }
  
      // Fetch messages between the current user (socket.userId) and the other user (userId)
      const messages = await Message.find({
        $or: [
          { sender: socket.userId, receiver: userId },
          { sender: userId, receiver: socket.userId }
        ],
        isDeleted: false
      }).sort({ timestamp: -1 })
        .populate('sender', 'username profilePicture')
        .populate('receiver', 'username profilePicture');
  
      // Log messages or lack of them
      // if (messages.length === 0) {
      //   console.log("No messages found between these users.");
      // } else {
      //   console.log("Messages found:", messages);
      // }
  
      // Send the fetched messages back to the client
      socket.emit('previousMessages', messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      socket.emit('error', { message: 'Error fetching messages' });
    }
  });
  

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.userId}`);
  });
});

// Connect to the database and start the server
connectDB()
  .then(() => {
    console.log('Database is successfully connected');

    server.listen(4000, () => {
      console.log('Server is listening at port 4000...');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

