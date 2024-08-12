import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import photo from '../assets/user-photo.png';
import { Link } from 'react-router-dom';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import ManageProfilePurchase from '../components/Profile/ManageProfilePurchase';

const Profile = () => {
    const [userdata, setUserData] = useState({});
    const { user, axiosInstance } = useContext(UserContext);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axiosInstance.get(`http://localhost:8080/auth/user/${user.id}`);
                setUserData(response.data);
            } catch (error) {
                console.log('Request failed. Please try again.');
            }
        };
        getUser();
    }, [axiosInstance, user.id]);

    return (
        <div className="flex min-h-screen bg-gray-900">
            <ProfileSidebar />
            <div className="w-full md:w-3/4 p-10 bg-gray-800">
                <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
                    <div className="flex items-center justify-between mb-5">
                        <h1 className="text-3xl font-bold text-white">User Profile</h1>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                            <Link to="/editprofile">Edit Profile</Link>
                        </button>
                    </div>
                    <div className="flex items-center space-x-6">
                        <img
                            src={photo}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-blue-500"
                        />
                        <div className="text-white">
                            <h2 className="text-2xl font-semibold">{userdata.firstName} {userdata.lastName}</h2>
                            <p className="text-gray-400">{userdata.email}</p>
                            <p className="text-gray-400">{userdata.role}</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-medium text-white mb-4">About Me</h3>
                        <p className="text-gray-300">
                        I’m a third-year Computer Science student with a passion for web development. Skilled in both front-end and back-end technologies, I’m eager to build dynamic, user-friendly applications. My goal is to leverage my knowledge in Python, React, and cloud services to create innovative web solutions.
                        </p>
                    </div>
                </div>
                <ManageProfilePurchase />
            </div>
        </div>
    );
};

export default Profile;
