import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';

const ManageProfilePurchase = () => {
    const { user, axiosInstance } = useContext(UserContext);
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchaseHistory = async () => {
            try {
                const response = await axiosInstance.get(`http://localhost:8080/purchase/${user.id}`);
                const data = response.data;
                setPurchases(data);
            } catch (error) {
                console.error("Error fetching purchase history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchaseHistory();
    }, [axiosInstance, user]);

    if (loading) {
        return <div className="text-center py-4 text-white">Loading...</div>;
    }

    if (purchases.length === 0) {
        return <div className="text-center py-4 text-white">No purchase history found.</div>;
    }

    return (
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg mt-8">
            <h1 className="text-2xl font-bold text-white mb-4">Purchase History</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 text-white rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-600">Mobile Number</th>
                            <th className="py-2 px-4 border-b border-gray-600 hidden md:table-cell">Plan Name</th>
                            <th className="py-2 px-4 border-b border-gray-600">Amount</th>
                            <th className="py-2 px-4 border-b border-gray-600 hidden md:table-cell">Validity</th>
                            <th className="py-2 px-4 border-b border-gray-600 hidden md:table-cell">Purchase Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((purchase) => (
                            <tr key={purchase.id} className="text-center">
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
    );
};

export default ManageProfilePurchase;
