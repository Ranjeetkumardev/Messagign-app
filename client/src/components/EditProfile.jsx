import React, { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const EditProfile = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    // State for profile fields
    const [profileData, setProfileData] = useState({
        username: "",
        mobile: "",
        profileImage: "",
        bio: "",
    });

    // Handles changes to text fields
    const handleProfileDataChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handles image file selection
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
            formData.append('username', profileData.username);
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

    // Function to open the file input when the image is clicked
    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <div className="flex flex-col items-center">
                    <div
                        className="relative group cursor-pointer"
                        onClick={handleImageClick}
                    >
                        <img
                            src={profileData.profileImage}
                            alt="User Avatar"
                            className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover bg-green-400"
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

                {/* Profile fields */}
                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        onChange={handleProfileDataChange}
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block text-sm font-medium text-gray-700 mt-2">Mobile</label>
                    <input
                        type="tel"
                        name="mobile"
                        value={profileData.mobile}
                        onChange={handleProfileDataChange}
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block text-sm font-medium text-gray-700 mt-2">Bio</label>
                    <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileDataChange}
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                    />
                </div>

                <button
                    onClick={handleSave}
                    disabled={uploading}
                    className={`w-full p-3 mt-4 rounded-lg text-white ${uploading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} transition duration-150`}
                >
                    {uploading ? <div className="w-full h-10  flex justify-center items-center"> 
                        <span className='animate-spin text-purple-600'><Loader2/></span> </div> : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
