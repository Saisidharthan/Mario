import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import { useLocation } from 'react-router-dom';

const ManagePurchase = () => {
    const { user, axiosInstance } = useContext(UserContext);
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchPurchaseHistory = async () => {
            try {
                const response = await axiosInstance.get(`http://localhost:8080/purchase/${user.id}`);
                setPurchases(response.data);
            } catch (error) {
                console.error("Error fetching purchase history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchaseHistory();
    }, [axiosInstance, user.id]);

    if (loading) {
        return <div className="text-center py-4 text-white">Loading...</div>;
    }

    if (purchases.length === 0) {
        return <div className="text-center py-4 text-white">No purchase history found.</div>;
    }

    const showSidebar = location.pathname !== '/profile';

    return (
        <div className={`flex min-h-screen ${showSidebar ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
            {showSidebar && <ProfileSidebar />}
            <div className={`flex-1 p-8 ${showSidebar ? 'w-3/4' : 'w-full'} bg-gray-800`}>
                <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-4 text-white">Purchase History</h1>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-gray-900 rounded-lg shadow-lg border border-gray-700">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="py-3 px-4 border-b border-gray-600 text-left">Mobile Number</th>
                                    <th className="py-3 px-4 border-b border-gray-600 hidden md:table-cell">Plan Name</th>
                                    <th className="py-3 px-4 border-b border-gray-600 text-left">Amount</th>
                                    <th className="py-3 px-4 border-b border-gray-600 hidden md:table-cell">Validity</th>
                                    <th className="py-3 px-4 border-b border-gray-600 hidden md:table-cell">Purchase Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases.map((purchase) => (
                                    <tr key={purchase.id} className="hover:bg-gray-800">
                                        <td className="py-2 px-4 border-b border-gray-600">{purchase.mobileNumber}</td>
                                        <td className="py-2 px-4 border-b border-gray-600 hidden md:table-cell">{purchase.planName}</td>
                                        <td className="py-2 px-4 border-b border-gray-600">{purchase.planAmount}</td>
                                        <td className="py-2 px-4 border-b border-gray-600 hidden md:table-cell">{purchase.planValidity}</td>
                                        <td className="py-2 px-4 border-b border-gray-600 hidden md:table-cell">
                                            {new Date(purchase.purchaseDate).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagePurchase;
