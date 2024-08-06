import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Admin/Sidebar';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editFormData, setEditFormData] = useState({ firstName: '', lastName: '', email: '', role: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  
  useEffect(() => {
    axios.get('http://localhost:8080/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleEditClick = (user) => {
    setEditFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
    setIsModalOpen(true);
    setCurrentUser(user);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditFormSubmit = () => {
    console.log(editFormData);
    
    axios.patch(`http://localhost:8080/updateUser/${currentUser.id}`, editFormData)
      .then(response => {
        setUsers(users.map(user => user.email === editFormData.email ? response.data : user));
        setIsModalOpen(false);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleDeleteClick = (user) => {
    axios.delete(`http://localhost:8080/deleteUser/${currentUser.id}`)
      .then(() => {
        setUsers(users.filter(user => user.email !== userEmail));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-[89vh] bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white">
      <div className="flex">
        <Sidebar />
        <div className="container mx-auto p-4 w-3/4">
          <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>
          <table className="min-w-full bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white">
            <thead>
              <tr>
                <th className="py-2">First Name</th>
                <th className="py-2">Last Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.email}>
                  <td className="border px-4 py-2">{user.firstName}</td>
                  <td className="border px-4 py-2">{user.lastName}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2 ">
                    <button
                      className="bg-yellow-500 text-white py-1 px-3 rounded mr-5 w-20"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded w-20"
                      onClick={() => handleDeleteClick(user)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-green-500 text-white py-1 px-3 rounded w-40 mx-5"
                    >
                      Change Password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-75 z-40" />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-xl">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-4xl mr-3"
                onClick={closeModal}
              >
                &times;
              </button>
              <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text text-center">Edit User</h2>
              <form onSubmit={handleEditFormSubmit} className='text-black'>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={editFormData.firstName}
                    onChange={handleEditFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                    Role
                  </label>
                  <select
                    name="role"
                    value={editFormData.role}
                    onChange={handleEditFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;