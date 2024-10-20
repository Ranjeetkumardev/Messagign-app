import React from 'react';

const UserProfile = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4">{user.name}</h2>
        <p>Status: {user.status}</p>
        <p>Bio: Lorem ipsum dolor sit amet...</p>
        <button className="mt-4 bg-indigo-600 text-white p-2 rounded-md" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
