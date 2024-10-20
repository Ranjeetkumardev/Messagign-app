import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Send, User, X } from 'lucide-react';
import { useTheme } from '../features/ThemeContext';

import Profile from './Profile';

const ChatWindow = ({ user, messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { isDarkMode } = useTheme();

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue(''); // Clear the input after sending
    }
  };

  console.log(messages)
  const handleEmojiClick = (emojiObject) => {
    setInputValue((prev) => prev + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col overflow-y-auto flex-grow relative shadow-lg ${
        isDarkMode
          ? "bg-[url('/chatBackground.jpg')]"
          : "bg-[url('/chatBackgroundWhite.jpg')]"
      } bg-cover bg-center`}
    >
      {/* Header with profile picture */}
      <div
        className={`flex-shrink-0 p-2 ${
          isDarkMode ? 'bg-darkBg text-lightGrayText' : 'bg-lightBg text-darkGrayText'
        } flex items-center`}
      >
        <span onClick={() => setShowProfile(!showProfile)} className="cursor-pointer">
          <img
            src={user.profilePicture}
            alt="Profile pic"
            className="w-10 h-10 object-cover rounded-full border-2 border-primary shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
          />
        </span>
        <div className="ml-3">
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs">{user.status}</p>
        </div>
      </div>

      {/* Profile modal */}
      {showProfile && (
        <Profile showProfile={showProfile} setShowProfile={() => setShowProfile(!showProfile)} user={user} />
      )}

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col space-y-2">
          {messages && messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender._id === user._id ? 'justify-start' : ' justify-end'}`}
            >
              <div
                className={`py-1 px-2 rounded-lg shadow-sm max-w-96  ${
                  msg.sender._id === user._id
                    ? `${"bg-blue-500 text-white"}`  // Color for sent messages
                    : 'bg-indigo-500 text-black'     // Color for received messages
                }`}
              >
               <div className='flex '>
                <p> <img src={msg.sender._id === user._id ? msg.sender.profilePicture : msg.receiver.profilePicture } alt='img' className='h-8 w-8 rounded-full '/> </p>
                <div>
               <p>{msg.content}</p>
                <p className="text-xs text-gray-500 flex justify-between mt-1">
                  <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                  <span>✔</span>
                </p> 
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div
        className={`flex-shrink-0 p-4 flex items-center relative ${
          isDarkMode ? 'bg-darkBg text-lightGrayText' : 'bg-lightBg text-darkGrayText'
        }`}
      >
        <button onClick={toggleEmojiPicker} className="mr-2">
          {showEmojiPicker ? <X /> : '😀'}
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-16 z-50 border rounded-md">
            <EmojiPicker onEmojiClick={handleEmojiClick} pickerStyle={{ width: '300px', height: '200px' }} />
          </div>
        )}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`flex-grow p-2 border rounded-md mr-2 ${
            isDarkMode ? 'bg-[#092635] text-white' : 'bg-white text-black'
          }`}
          placeholder="Type a message..."
        />
        <button
          className="bg-indigo-600 text-white p-2 rounded-md"
          onClick={handleSendMessage}
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;






// import React, { useState } from 'react';
// import EmojiPicker from 'emoji-picker-react';
// import { Send, User, X } from 'lucide-react';
// import { useTheme } from '../features/ThemeContext';

// import Profile from './Profile';

// const ChatWindow = ({ user, messages, onSendMessage }) => {
//   const [inputValue, setInputValue] = useState('');
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const { isDarkMode } = useTheme();

//   const handleSendMessage = () => {
//     if (inputValue.trim()) {
//       onSendMessage(inputValue);
//       setInputValue(''); // Clear the input after sending
//     }
//   };

//   const handleEmojiClick = (emojiObject) => {
//     setInputValue((prev) => prev + emojiObject.emoji);
//   };

//   const toggleEmojiPicker = () => {
//     setShowEmojiPicker((prev) => !prev);
//   };

//   return (
//     <div
//       className={`flex flex-col overflow-y-auto flex-grow relative shadow-lg ${
//         isDarkMode
//           ? "bg-[url('/chatBackground.jpg')]"
//           : "bg-[url('/chatBackgroundWhite.jpg')]"
//       } bg-cover bg-center`}
//     >
//       {/* Header with profile picture */}
//       <div
//         className={`flex-shrink-0 p-2 ${
//           isDarkMode ? 'bg-darkBg text-lightGrayText' : 'bg-lightBg text-darkGrayText'
//         } flex items-center`}
//       >
//         <span onClick={() => setShowProfile(!showProfile)} className="cursor-pointer">
//           <img
//             src={user.profilePicture}
//             alt="Profile pic"
//             className="w-10 h-10 object-cover rounded-full border-2 border-primary shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
//           />
//         </span>
//         <div className="ml-3">
//           <p className="font-semibold">{user.name}</p>
//           <p className="text-xs">{user.status}</p>
//         </div>
//       </div>

//       {/* Profile modal */}
//       {showProfile && (
//         <Profile showProfile={showProfile} setShowProfile={() => setShowProfile(!showProfile)} user={user} />
//       )}

//       {/* Chat Messages */}
//       <div className="flex-grow p-4 overflow-y-auto">
//         {/* <div className="flex flex-col space-y-2">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${msg.sender === user._id ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`p-2 rounded-lg shadow-sm max-w-96 ${
//                   msg.sender === user._id
//                     ? 'bg-indigo-600 text-white'
//                     : 'bg-gray-200 text-black'
//                 }`}
//               >
//                 <p>{msg.content}</p>
//                 <div className="text-xs text-gray-500 flex justify-between mt-1">
//                   <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
//                   <span>✔</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div> */}
//         <div className="flex flex-col space-y-2">
//   {messages && messages.map((msg, index) => (
//     <div
//       key={index}
//       className={`flex ${msg.sender === user._id ? 'justify-end' : 'justify-start'}`}
//     >
//       <div
//         className={`p-2 rounded-lg shadow-sm max-w-96 ${
//           msg.sender === user._id
//             ? 'bg-indigo-600 text-white'
//             : 'bg-gray-200 text-black'
//         }`}
//       >
//         <p>{msg.content}</p>
//         <div className="text-xs text-gray-500 flex justify-between mt-1">
//           <span>{new Date().toLocaleTimeString()}</span>
//           <span>✔</span>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>
//       </div>

//       {/* Input Area */}
//       <div
//         className={`flex-shrink-0 p-4 flex items-center relative ${
//           isDarkMode ? 'bg-darkBg text-lightGrayText' : 'bg-lightBg text-darkGrayText'
//         }`}
//       >
//         <button onClick={toggleEmojiPicker} className="mr-2">
//           {showEmojiPicker ? <X /> : '😀'}
//         </button>
//         {showEmojiPicker && (
//           <div className="absolute bottom-16 z-50 border rounded-md">
//             <EmojiPicker onEmojiClick={handleEmojiClick} pickerStyle={{ width: '300px', height: '200px' }} />
//           </div>
//         )}
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           className={`flex-grow p-2 border rounded-md mr-2 ${
//             isDarkMode ? 'bg-[#092635] text-white' : 'bg-white text-black'
//           }`}
//           placeholder="Type a message..."
//         />
//         <button
//           className="bg-indigo-600 text-white p-2 rounded-md"
//           onClick={handleSendMessage}
//         >
//           <Send />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;


 