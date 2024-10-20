import React, { useEffect, useState } from 'react';
import { useTheme } from '../features/ThemeContext';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetUserByIdQuery } from '../features/apiSlice';

const Account = ({ isOpenAccount, toggleAccount }) => {
  const { isDarkMode } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const userId = localStorage.getItem("userId");

  // Fetch user data
  const { data: userData, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !userId,
    selectFromResult: ({ data, isLoading, error }) => ({
      data,
      isLoading,
      error,
    }),
  });

  // Initialize profile data state
  const [profileData, setProfileData] = useState({
    username: "",
    mobile: "",
    profileImage: "",
    bio: "",
  });

  // Update profile data when userData changes
  useEffect(() => {
    if (userData?.user) {
      setProfileData({
        username: userData.user.name || "",
        mobile: userData.user.mobile || "",
        profileImage: userData.user.profilePicture || "",
        bio: userData.user.bio || "",
      });
    }
  }, [userData]);

  const handleProfileDataChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prevData => ({
          ...prevData,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setUploading(true);
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      formData.append('username', profileData.username); // Use username instead of name
      formData.append('mobile', profileData.mobile);
      formData.append('bio', profileData.bio);

      const response = await axios.post('http://localhost:4000/api/upload', formData, {
        withCredentials: true,
      });

      setProfileData(prevData => ({
        ...prevData,
        profileImage: response.data.imageUrl,
      }));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleImageClick = () => {
    document.getElementById('fileInput').click();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message || "Error fetching user data"}</div>;

  return (
    <div className={`fixed top-0 h-screen w-[90%] transition-transform duration-500 ease-in-out transform overflow-hidden ${isDarkMode ? 'bg-darkBg text-white' : 'bg-lightBg'} ${isOpenAccount ? 'translate-x-0 left-10' : '-translate-x-full -left-10'}`}>
      <div className="ml-2 p-2 flex justify-end mr-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700" onClick={toggleAccount}>
        <X />
      </div>

      <div className="flex flex-col items-center">
        <div className="relative group cursor-pointer" onClick={handleImageClick}>
          <img
            src={profileData.profileImage || 'https://via.placeholder.com/150'} // Fallback image if profileImage is empty
            alt="User Avatar"
            className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover"
          />
          <div className="absolute mb-4 inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-sm">Change Photo</span>
          </div>
        </div>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className="flex-1 px-4 py-2 space-y-4">
        <div className="border-t pt-2 dark:border-gray-700">
          <h2 className="font-semibold text-lg mb-2">Details</h2>
          <p className="text-sm mb-1"><span className="font-medium">Phone:</span> {profileData.mobile}</p>
          <p className="text-sm"><span className="font-medium">Bio:</span> {profileData.bio}</p>
        </div>

        <div className="border-t pt-2 dark:border-gray-700">
          <h2 className="font-semibold text-lg mb-2">Settings</h2>
          <Link to={"/editprofile"}>
            <button className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150">Edit Profile</button>
          </Link>
          <button className="w-full p-2 mt-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-150">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
