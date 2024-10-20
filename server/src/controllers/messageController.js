import mongoose from 'mongoose';
import Message from '../models/Message.js';
import User from '../models/User.js';

// Utility function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content, mediaUrl } = req.body;

    // Validate sender and receiver IDs
    if (!isValidObjectId(sender) || !isValidObjectId(receiver)) {
      return res.status(400).json({ message: "Invalid sender or receiver ID" });
    }

    // Validate if both sender and receiver exist
    const senderUser = await User.findById(sender);
    const receiverUser = await User.findById(receiver);
    if (!senderUser || !receiverUser) {
      return res.status(404).json({ message: "Sender or Receiver not found" });
    }

    // Validate if either content or mediaUrl is provided
    if (!content && !mediaUrl) {
      return res.status(400).json({ message: "Either content or mediaUrl is required" });
    }

    // Create the message
    const message = new Message({ sender, receiver, content, mediaUrl });
    await message.save();

    res.status(201).json({ message: "Message sent successfully", data: message });
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error: error.message });
  }
};

// Get messages for a user with pagination support
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query; // Pagination parameters with defaults

    // Validate userId
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const messages = await Message.find({ 
      $or: [{ sender: userId }, { receiver: userId }] 
    })
    .populate('sender', 'name profilePicture') // Populate sender info (name, profilePicture)
    .populate('receiver', 'name profilePicture') // Populate receiver info (name, profilePicture)
    .sort({ timestamp: -1 }) // Sort by most recent messages first
    .skip((page - 1) * limit) // Pagination
    .limit(parseInt(limit));

    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error: error.message });
  }
};

// Reply to a message
export const replyToMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { sender, content, mediaUrl } = req.body;

    // Validate IDs
    if (!isValidObjectId(sender) || !isValidObjectId(messageId)) {
      return res.status(400).json({ message: "Invalid sender or message ID" });
    }

    // Validate if the sender exists
    const senderUser = await User.findById(sender);
    if (!senderUser) {
      return res.status(404).json({ message: "Sender not found" });
    }

    // Find the original message to reply to
    const originalMessage = await Message.findById(messageId);
    if (!originalMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Validate if either content or mediaUrl is provided
    if (!content && !mediaUrl) {
      return res.status(400).json({ message: "Either content or mediaUrl is required" });
    }

    // Create the reply message
    const replyMessage = new Message({
      sender,
      receiver: originalMessage.receiver, // Set the receiver as the same user in the original message
      content,
      mediaUrl,
      replyTo: messageId // Set replyTo directly to messageId
    });

    await replyMessage.save();

    res.status(201).json({ message: "Reply sent successfully", data: replyMessage });
  } catch (error) {
    res.status(500).json({ message: "Error replying to message", error: error.message });
  }
};
