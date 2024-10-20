// src/Home.js
import { Share, MessageCircle } from 'lucide-react';
import React from 'react';
import { useTheme } from '../features/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Home = ({users}) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  
  return (
   (users === !null || users=== !undefined ?  <div
      className={`${
        isDarkMode ? 'bg-darkBg text-white' : 'bg-lightBg text-black'
      } min-h-screen py-4 px-4 sm:px-8 md:px-16`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {users?.map((user) => (
            <div
              key={user._id}
              className={`${
                isDarkMode
                  ? 'dark:bg-darkBg text-white'
                  : 'bg-lightBg text-black'
              } shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer`}
              onClick={() => navigate(`/user/${user._id}`)}
            >
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-2">
                <div className="flex items-center mb-2">
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div> : navigate("/register") )
  );
};

export default Home;







//  import {  Share, MessageCircle } from 'lucide-react';
// import React from 'react';
// import { useTheme } from '../features/ThemeContext';

// const Home = () => {
//   const { isDarkMode } = useTheme();

//   // Sample data for cards
//   const cards = [
//     {
//       id: 1,
//       title: 'Beautiful Landscape',
//       image: 'https://via.placeholder.com/600x400', // Replace with actual image URLs
//       profileImage: 'https://via.placeholder.com/50',
//       description: 'A scenic view of the mountains during sunset.',
//     },
//     {
//       id: 2,
//       title: 'City Life',
//       image: 'https://via.placeholder.com/600x400',
//       profileImage: 'https://via.placeholder.com/50',
//       description: 'Busy streets of a metropolitan city at night.',
//     },
//     {
//       id: 3,
//       title: 'Nature Walk',
//       image: 'https://via.placeholder.com/600x400',
//       profileImage: 'https://via.placeholder.com/50',
//       description: 'A peaceful walk in the forest surrounded by nature.',
//     },
//     {
//       id: 4,
//       title: 'Nature Walk',
//       image: 'https://via.placeholder.com/600x400',
//       profileImage: 'https://via.placeholder.com/50',
//       description: 'A peaceful walk in the forest surrounded by nature.',
//     },
//     {
//       id: 5,
//       title: 'Nature Walk',
//       image: 'https://via.placeholder.com/600x400',
//       profileImage: 'https://via.placeholder.com/50',
//       description: 'A peaceful walk in the forest surrounded by nature.',
//     },
   
//   ];

//   return (
//     <div
//       className={`${
//         isDarkMode ? 'bg-darkBg text-white' : 'bg-lightBg text-black'
//       } min-h-screen py-4 px-4 sm:px-8 md:px-16`}
//     >
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {cards.map((card) => (
//             <div
//               key={card.id}
//               className= {`${isDarkMode ? "dark:bg-darkBg text-white" : "bg-lightBg text-black"} shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105`}
//             >
//               {/* Card Image */}
//               <img
//                 src={card.image}
//                 alt={card.title}
//                 className="w-full h-36 object-cover"
//               />
//               <div className="p-2">
//                 {/* Profile Section */}
//                 <div className="flex items-center mb-2">
//                   <img
//                     src={card.profileImage}
//                     alt="Profile"
//                     className="w-10 h-10 rounded-full mr-3"
//                   />
//                   <div>
//                     <h3 className="font-semibold">{card.title}</h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       {card.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
