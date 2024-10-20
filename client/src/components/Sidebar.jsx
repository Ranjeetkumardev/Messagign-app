 

import { Home, MoonIcon, Search, Settings, SunIcon, X } from 'lucide-react';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '../features/ThemeContext';
import { useGetAllUsersQuery, useGetUserByIdQuery } from '../features/apiSlice';
import Account from './Acount';
import { Link } from 'react-router-dom';

const Sidebar = ({ selectedUser, onSelectUser, showSidebar, onClose }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { data, isLoading, error } = useGetAllUsersQuery();
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef(null);
  const userId = localStorage.getItem("userId")
  const { data: userData } = useGetUserByIdQuery(userId, {
    skip: !userId,
    // This component will use the cached data if available
    selectFromResult: ({ data, isLoading, error }) => ({
      data,
      isLoading,
      error,
    }),
  });

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const toggleAccount = () => {
    setIsOpenAccount((prev) => !prev);
  };

  const handleClickOutside = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const users = data?.users || [];

  if (error) {
    return <div>Error loading users</div>;
  }

  return (
    <div
      className={`fixed left-0 h-full md:w-96 w-64 flex ${
        isDarkMode ? 'bg-darkBg text-lightGrayText' : 'bg-lightBg text-darkGrayText'
      } shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0 sm:relative hide-scrollbar`}
    >
      <div
        className={`max-w-12 z-40 h-screen border-r border-r-gray flex flex-col justify-between py-4 ${
          isDarkMode ? 'bg-darkBg text-lightGrayText' : 'bg-lightBg text-darkGrayText'
        }`}
      >
        <div className='space-y-2 p-2'>
          <Link to={"/"}>
          <Home />
          </Link>
          <Settings />
        </div>
        <div className='space-y-4 p-2'>
          <Settings />
          <p className='hover:bg-stone-700 rounded-full' onClick={toggleAccount}>
            <img
              src={userData?.user?.profilePicture}
              className='w-10 h-8 object-cover rounded-full border'
              alt={`${"andu mandu"}'s profile`}
            />
          </p>
        </div>
      </div>
     
      <div className="z-20  h-screen">
        <Account isOpenAccount={isOpenAccount} toggleAccount={toggleAccount} />
      </div>
      
      <div className='w-full'>
        <div className="flex gap-2 items-center justify-between overflow-y-auto p-4 bg-primary text-white">
          <div className="flex-1 w-full" ref={searchRef} >
            {isSearchOpen ? (
              <input
                type="search"
                placeholder="Search..."
                className="w-full px-2 py-1 bg-gray-300 text-black rounded-full outline-none transition-all duration-300 ease-in-out"
                autoFocus
              />
            ) : (
              <h2 className="text-lg font-bold cursor-pointer  hover:text-purple-800 inline-block" onClick={toggleSearch}>
                <Search />
              </h2>
            )}
          </div>
          <div className="ml-4 cursor-pointer sm:block" onClick={toggleDarkMode}>
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </div>
          <p className="sm:hidden text-white" onClick={onClose}>
            <X />
          </p>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : users.length > 0 ? (
          <ul className="p-2 overflow-y-auto">
            {users.map((user) => (
              <li
                key={user._id}
                className={`p-2 cursor-pointer rounded-lg transition-colors duration-200 ${
                  selectedUser && selectedUser._id === user._id
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-200 dark:hover:bg-darkGrayInput'
                }`}
                onClick={() => onSelectUser(user)}
              >
                <div className="flex-1">
                  <div className='w-full flex gap-2'>
                    <div className='relative z-10'>
                      <img
                        src={user.profilePicture}
                        className='w-8 h-8 object-cover rounded-full border'
                        alt={`${user.name}'s profile`}
                      />
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                          user.status === 'online' ? 'bg-success' :
                          user.status === 'offline' ? 'bg-error' :
                          'bg-warning'
                        }`}
                      ></div>
                    </div>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>No users found.</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;





 