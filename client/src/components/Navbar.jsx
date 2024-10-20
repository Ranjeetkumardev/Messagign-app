import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessagesSquare, MoonIcon, SunIcon, User, UserCircle } from 'lucide-react';
import { useTheme } from '../features/ThemeContext';
import axios from 'axios';
import { toast } from 'sonner';
import { BASE_URL } from '../features/apiSlice';
 

const Navbar = ({userData}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const isMessagesPage = location.pathname === '/messages';
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/logout`,
        {},
        {
          withCredentials: true, // This ensures that cookies or other credentials are sent with the request
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("userId")
        toast.success("Logout Successfully");
        setIsAuthenticated(false); // Update state to indicate user is logged out
        navigate("/register");
      }
    } catch (err) {
      toast.error("Unable to Logout.");
      console.error("Logout error:", err.message);
    }
  };
  
   // Use useEffect to set authentication state based on userData
   useEffect(() => {
    if (userData) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userData]);

  return (
    !isMessagesPage && (
      <nav
        className={`sticky top-0 z-30 flex justify-between items-center w-full px-4 transition-all duration-300 ${
          isDarkMode
            ? 'bg-[#001F3F] text-white border-b border-gray-700'
            : 'bg-white text-black border-b border-slate-300'
        }`}
        style={{ height: '60px' }}
      >
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/chatHomeLogo.png"
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-primary bg-white p-2 m-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
              <Link
                to="/post"
                className="text-lg font-medium hover:text-primary transition-colors duration-300"
              >
                Posts
              </Link>
              <Link
                to="/messages"
                className="text-lg font-medium flex items-center hover:text-primary transition-colors duration-300"
              >
                <MessagesSquare />
              </Link>
              <button
                className="text-lg font-medium flex items-center hover:text-primary transition-colors duration-300"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? (
                  <SunIcon className="text-yellow-500" />
                ) : (
                  <MoonIcon className="text-gray-600" />
                )}
              </button>

              {/* User Dropdown */}
             {isAuthenticated ?  <div
                className="relative ml-6 flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => setDropdownVisible(!dropdownVisible)}
                ref={dropdownRef}
              >
                <span className="cursor-pointer">
                <img
              src={userData?.user?.profilePicture}
              className='w-10 h-10 object-cover rounded-full border'
              alt={`${"andu mandu"}'s profile`}
            />
                </span>
                {dropdownVisible && (
                  <div className="absolute top-14 -right-2 w-32 bg-white dark:bg-darkBg rounded-lg shadow-xl z-50 cursor-pointer">
                    <Link to="/account">
                      <p className="w-full px-4 py-2 hover:bg-teal-200">Settings</p>
                    </Link>
                    <Link to={"/register"}>
                    <p
                      className="w-full px-4 py-2 hover:bg-teal-200"
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                    </Link>
                  </div>
                )}
              </div> : <div className='hover:text-neutral-500 '> 
                <Link to={"/register"}><UserCircle size={28}/></Link>
                 </div> }
            </div> 
      </nav>
    )
  );
};

export default Navbar;
