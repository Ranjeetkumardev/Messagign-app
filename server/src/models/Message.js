import mongoose from 'mongoose';

// Define the message schema
const messageSchema = new mongoose.Schema({
  content: { 
    type: String,
    validate: {
      validator: function (value) {
        // Ensure either content or mediaUrl is provided
        return value || this.mediaUrl;
      },
      message: 'Either content or mediaUrl is required',
    },
  },
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  receiver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['sent', 'delivered', 'read'], 
    default: 'sent' 
  },
  mediaUrl: { 
    type: String 
  }, // URL of any media (image, video, etc.)
  replyTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Message'
  }, // Reference to another message if this is a reply
  reactions: [
    {
      emoji: { type: String }, // The emoji used for the reaction
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // User who reacted
    }
  ],
  isDeleted: { 
    type: Boolean, 
    default: false 
  }  
}, {
  timestamps: true // Automatically add createdAt and updatedAt timestamps
});

// Index sender and receiver for faster lookup
messageSchema.index({ sender: 1, receiver: 1, timestamp: -1 });

const Message = mongoose.model('Message', messageSchema);
export default Message;
