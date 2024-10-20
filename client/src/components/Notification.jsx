import React from 'react';

const Notification = () => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white p-3 rounded-lg shadow-lg animate-slide-in">
      New message received!
    </div>
  );
};

export default Notification;
