import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Home, Podcast, Settings } from 'lucide-react';
import { useTheme } from '../features/ThemeContext';

const BottomNav = ({ showBottomNav, setShowBottomNav }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed top-0 right-0  max-w-3xl ">
      {/* Navigation content with transition */}
      <div
        className={`transition-transform duration-500 ease-in-out  transform ${
          showBottomNav ? 'translate-x-0' : 'translate-x-full'
        } overflow-hidden ${isDarkMode ? 'bg-darkBg text-white' : 'bg-lightBg'} h-full`}
      >
        <div className="flex p-2 pr-10  justify-around">
          <Link to="/">
            <p className="p-2 hover:bg-gray-200 dark:hover:bg-darkGrayInput rounded-md transition-colors duration-300">
              <Home className="w-6 h-6" />
            </p>
          </Link>
          <Link to="post">
            <p className="p-2 hover:bg-gray-200 dark:hover:bg-darkGrayInput rounded-md transition-colors duration-300">
              <Podcast className="w-6 h-6" />
            </p>
          </Link>
          <Link to="/account">
            <p className="p-2 hover:bg-gray-200 dark:hover:bg-darkGrayInput rounded-md transition-colors duration-300">
              <Settings className="w-6 h-6" />
            </p>
          </Link>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setShowBottomNav(!showBottomNav)}
        className="absolute top-2  right-0 bg-primary p-2 rounded-full shadow-lg hover:bg-buttonHover transition-colors duration-300"
      >
        {!showBottomNav ? (
          <ChevronLeft className="w-6 h-6 text-white transition-transform duration-300" />
        ) : (
          <ChevronRight className="w-6 h-6 text-white transition-transform duration-300" />
        )}
      </button>
    </div>
  );
};

export default BottomNav;
 






// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ChevronUp, ChevronDown, ChevronRight, ChevronLeft, Home, Podcast, Settings } from 'lucide-react';

// const BottomNav = ({ showBottomNav, setShowBottomNav }) => {
//   return (
//     // <div className="sticky bottom-0 w-full">
//     <div className="absolute top-0 right-0 max-w-2xl max-h-xl ">
//       {/* Navigation content with transition */}
//       <div
//         className={`transition-all duration-500 ease-in-out ${
//           showBottomNav ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
//         } overflow-hidden ${showBottomNav ? 'bg-primary text-white' : 'bg-darkBg text-lightGrayText'}`} // Match sidebar colors
//       >
//         <div className="flex justify-around p-4">
//           <Link to="/">
//             <p className="p-2 hover:bg-gray-200 dark:hover:bg-darkGrayInput rounded-md transition-colors duration-300">
//               <Home className="w-6 h-6 text-white" /> {/* Icon color */}
//             </p>
//           </Link>
//           <Link to="post">
//             <p className="p-2 hover:bg-gray-200 dark:hover:bg-darkGrayInput rounded-md transition-colors duration-300">
//               <Podcast className="w-6 h-6 text-white" /> {/* Icon color */}
//             </p>
//           </Link>
//           <Link to="/setting">
//             <p className="p-2 hover:bg-gray-200 dark:hover:bg-darkGrayInput rounded-md transition-colors duration-300">
//               <Settings className="w-6 h-6 text-white" /> {/* Icon color */}
//             </p>
//           </Link>
//         </div>
//       </div>

//       {/* Toggle button */}
//       <button
//         onClick={() => setShowBottomNav(!showBottomNav)}
//         className="absolute bottom-1/2 right-0 bg-blue-primary p-1 rounded-full shadow-lg hover:bg-buttonHover transition-colors duration-300"
//       >
//         {showBottomNav ? (
//           <ChevronRight className="w-6 h-6 text-white transition-transform duration-300" /> 
//         ) : (
//           <ChevronLeft className="w-6 h-6 text-white transition-transform duration-300" />  
//         )}
//       </button>
//     </div>
//   );
// };

// export default BottomNav;
