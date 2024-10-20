 
import React from 'react'
import { useTheme } from '../features/ThemeContext'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

const Profile = ({ showProfile, setShowProfile ,user}) => {
    const { isDarkMode } = useTheme()
    return (
        <div className={`w-72 flex flex-col z-50 h-screen fixed right-0 top-0 duration-500 transition-transform ${showProfile ? "translate-x-0" : "translate-x-full"} ${isDarkMode ? "dark:bg-darkBg text-white" : "bg-lightBg text-black"} shadow-lg`}>
            {/* Close Button */}
            <div className="ml-2  p-2 flex justify-start cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700" onClick={setShowProfile}>
            <X />
            </div>
            
            {/* Profile Info */}
            <div className="flex flex-col items-center p-4">
                <img 
                    src={user?.profilePicture}
                    alt="User Avatar" 
                    className="w-24 h-24 rounded-full mb-4 shadow-lg"
                />
                <h1 className="text-xl font-semibold mb-1">{user?.name}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>

            {/* Profile Details */}
            <div className="flex-1 px-4 py-2 space-y-4">
                <div className="border-t pt-2 dark:border-gray-700">
                    <h2 className="font-semibold text-lg mb-2">Details</h2>
                    <p className="text-sm mb-1"><span className="font-medium">Phone:</span> {user.mobile}</p>
                    <p className="text-sm"><span className="font-medium">Address:</span>  {user.status}</p>
                </div>

                <div className="border-t pt-2 dark:border-gray-700">
                    <h2 className="font-semibold text-lg mb-2">Settings</h2>
                     
                    <button  className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150">Send Request </button>
                   
                    {/* <button className="w-full p-2 mt-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-150">Logout</button> */}
                </div>
            </div>
        </div>
    )
}

export default Profile
