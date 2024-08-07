import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

const ManagePurchase = () => {
    const {user,axiosInstance} = useContext(UserContext);
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(user);
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
    }, [user]);

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (purchases.length === 0) {
        return <div className="text-center py-4">No purchase history found.</div>;
    }

    return (
        <div className="container mx-auto p-4 w-full h-[88vh]">
            <h1 className="text-2xl font-bold mb-4 text-center">Purchase History</h1>
            <div className="overflow-x-auto w-3/4 mx-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Mobile Number</th>
                            <th className="py-2 px-4 border-b">Plan Name</th>
                            <th className="py-2 px-4 border-b">Amount</th>
                            <th className="py-2 px-4 border-b">Validity</th>
                            <th className="py-2 px-4 border-b">Purchase Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((purchase) => (
                            <tr key={purchase.id} className="text-center">
                                <td className="py-2 px-4 border-b">{purchase.id}</td>
                                <td className="py-2 px-4 border-b">{purchase.mobileNumber}</td>
                                <td className="py-2 px-4 border-b">{purchase.planName}</td>
                                <td className="py-2 px-4 border-b">{purchase.planAmount}</td>
                                <td className="py-2 px-4 border-b">{purchase.planValidity}</td>
                                <td className="py-2 px-4 border-b">
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

export default ManagePurchase;
