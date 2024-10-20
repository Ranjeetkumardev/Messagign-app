import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client'; 
import Sidebar from './Sidebar';
import { ArrowRight } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { useTheme } from '../features/ThemeContext';
import { useGetUserByIdQuery } from '../features/apiSlice';
 

const Message = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false); 
  const [messages, setMessages] = useState([]); // State to hold messages
  const { isDarkMode } = useTheme();
  
  const LoggedInUserId = localStorage.getItem("userId");
  const { data: loggedInUserData } = useGetUserByIdQuery(LoggedInUserId, {
    skip: !LoggedInUserId,
  });
  
  const socket = useRef(null);
  
  useEffect(() => {
    // Initialize socket connection
    socket.current = io('http://localhost:4000', {
      withCredentials: true,
      transports: ['websocket'],
    });

    // Handle socket connection errors
    socket.current.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    // Listen for incoming messages
    socket.current.on('newMessage', (message) => {
      console.log("New message:", message);
      // Update messages state with the new message
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Listen for previous messages
    socket.current.on('previousMessages', (previousMessages) => {
      console.log("Previous messages:", previousMessages);
      // Set the messages state with previously fetched messages
      setMessages(previousMessages);
    });

    // Clean up socket listeners on unmount
    return () => {
      socket.current.off('newMessage');
      socket.current.off('previousMessages');
      socket.current.disconnect();
    };
  }, []) ;

  const handleSelectUser = (user) => {
  
    setSelectedUser(user);
    setShowSidebar(false); // Hide sidebar on mobile when a user is selected
   let userId =  user?._id
    // Emit an event to fetch previous messages for the selected user
    socket.current.emit('fetchMessages', { userId  });
  };

  const handleSendMessage = (messageContent) => {
    if (!messageContent || messageContent.trim() === '') {
      console.error('Cannot send an empty message');
      return; // Prevent sending empty messages
    }
  
    if (!selectedUser || !selectedUser._id) {
      console.error('No user selected or invalid user ID');
      return; // Make sure a valid user is selected
    }
  
    const message = {
      content: messageContent,
      sender: loggedInUserData.user._id,
      receiverId: selectedUser._id,
    };
  
    console.log("Sending message:", message);
    socket.current.emit('sendMessage', message); // Emit the sendMessage event
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-darkBg' : 'bg-lightBg'}`}>
      {/* Sidebar */}
      <Sidebar
        selectedUser={selectedUser}
        onSelectUser={handleSelectUser}
        showSidebar={showSidebar}
        onClose={() => setShowSidebar(false)}
      />

      {/* Arrow Button to Show Sidebar on Mobile */}
      {!showSidebar && (
        <p
          className="fixed left-0 top-1/2 transform -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-r-full sm:hidden z-20"
          onClick={() => setShowSidebar(true)}
        >
          <ArrowRight size={16} />
        </p>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-grow relative">
        {selectedUser ? (
          <div className="h-screen flex flex-col">
            <ChatWindow
              user={selectedUser}
              messages={messages} // Pass messages to ChatWindow
              onSendMessage={handleSendMessage}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Select a user to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
 