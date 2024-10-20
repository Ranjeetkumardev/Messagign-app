import React from 'react';

const users = [
  { id: 1, name: 'Alice', status: 'online' },
  { id: 2, name: 'Bob', status: 'offline' },
  { id: 3, name: 'Charlie', status: 'online' },
  // More users
];

const UserList = ({ onSelectUser }) => {
  return (
    <ul className="h-full overflow-y-auto divide-y divide-gray-200">
      {users.map((user) => (
        <li
          key={user.id}
          className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelectUser(user)}
        >
          <span className={`h-3 w-3 rounded-full mr-2 ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
          <p className="font-medium">{user.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
