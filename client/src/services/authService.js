import axios from 'axios';

export  const API_URL = 'http://localhost:4000/api';  

// Configure axios to include credentials with every request (for cookies)
axios.defaults.withCredentials = true;

// Authentication API calls
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  return response.data; // Return response data
};

const signup = async (userInfo) => {
  const response = await axios.post(`${API_URL}/users/signup`, userInfo);
  return response.data; // Return response data
};

const logout = async () => {
  await axios.post(`${API_URL}/users/logout`); // Perform logout
};

 

// Export all functions for use in the application
export { login, signup, logout,  };




 