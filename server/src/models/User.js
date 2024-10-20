import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
     
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  profilePicture:{
    type : String,
    default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgc2u0F9JdscSSIM4LH0ca2FLNgVS-vat7LSZKFb73azHEfhVfW7vwnFaq5bidMl1_tsg&usqp=CAU"
  },
  mobile:{
    type : String,
    default : "1234567890"
  },
  status: { 
    type: String, 
    enum: ['offline', 'online', 'typing'], 
    default: 'offline'  
  },
}, { timestamps: true });

// Hash password before saving
// userSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 10); // Hash the password with a salt rounds of 10
//   }
//   next();
// });

// Method to generate JWT token
userSchema.methods.generateToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
   
  return token;
};

// Method to validate password
userSchema.methods.isPasswordValid = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const passwordMatches = await bcrypt.compare(passwordInputByUser, passwordHash);
  return passwordMatches;
};
// Creating the User model
const User = mongoose.model('User', userSchema);
export default User;
 