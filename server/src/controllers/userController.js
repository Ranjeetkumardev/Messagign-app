import User from '../models/User.js';
import bcrypt from 'bcryptjs';
 

// User registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
     // Hash the password  
     const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      //password, // This will be hashed automatically in the pre-save middleware
    });

      // Generate token
    const token = await user.generateToken();
 
    // setting the token in cookies
    res.cookie('token', token,
       { httpOnly: true,
         maxAge:60 * 60 * 1000,
          sameSite: 'Lax' ,
          path : "/"
        });
  
     // Emit socket event when user registers
     req.io.emit('user-online', user._id);
     user.status = 'online';
    await user.save();

    res.status(201).json({ message: 'User SignUp successfully ...'  , user});
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await user.isPasswordValid(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = await user.generateToken();
    res.cookie('token', token, { 
      httpOnly: true, 
      maxAge: 60 * 60 * 1000, 
      sameSite: 'Lax', 
      path: '/' 
    });

    user.status = 'online';
    await user.save();
    //req.io.emit('user-online', user._id);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error("Error logging in:", error);

    // Check if the error has more details
    const errorMessage = error.message || 'An unknown error occurred';
    res.status(500).json({ message: 'Error logging in', error: errorMessage });
  }
};

 
export const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    console.log('Current status before logout:', user.status);  // Log current status

    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'Lax',
      path: '/',
    });

    // Set user status to offline
    user.status = 'offline';
    await user.save();

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error: error.message });
  }
};

// Update user profile
export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err });
  }
};

// Delete user profile
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting profile", error: err });
  }
};

// Get user by userId
export const getUserByUserId = async (req, res) => {
  try {
    const { _id: userId } = req.params;

    console.log("userId: ", userId); // Log the userId for debugging
     
    // Fetch user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User found", user });
  } catch (err) {
    console.error("Error retrieving user:", err); // Log error for debugging
    res.status(500).json({ message: "Error retrieving user", error: err.message });
  }
};



 
// Get all users except the logged-in user
export const getAllUsers = async (req, res) => {
  try {
    // Exclude the logged-in user by their ID
    const loggedInUserId = req.user._id; // Assumes req.user._id is available after authentication middleware
    const users = await User.find({ _id: { $ne: loggedInUserId } });
    res.status(200).json({ message: "All users found", users });
  } catch (err) {
    res.status(500).json({ message: "Unable to retrieve all users data", error: err });
  }
};