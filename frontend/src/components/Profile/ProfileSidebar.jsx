import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const ProfileSidebar = () => {
  const { logoutUser } = useContext(UserContext);

  return (
    <div className="w-1/4 bg-gray-900 p-6 shadow-lg border-r border-gray-800">
      <h2 className="text-2xl font-semibold mb-6 text-white">Profile Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link 
            to="/profile" 
            className="block text-lg text-gray-300 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 rounded"
            aria-label="Profile Overview"
          >
            Overview
          </Link>
        </li>
        <li>
          <Link 
            to="/editprofile" 
            className="block text-lg text-gray-300 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 rounded"
            aria-label="Edit Profile"
          >
            Edit Profile
          </Link>
        </li>
        <li>
          <Link 
            to="/managepurchase" 
            className="block text-lg text-gray-300 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 rounded"
            aria-label="Order History"
          >
            Order History
          </Link>
        </li>
        <li>
          <Link 
            to="/changepassword" 
            className="block text-lg text-gray-300 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 rounded"
            aria-label="Change Password"
          >
            Change Password
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
