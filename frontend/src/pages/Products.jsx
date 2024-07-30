import axios from "axios";
import { useEffect, useState } from "react";
import img from '../assets/img-1.jpg';
import Header from "../components/Home/Header";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const [Plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('http://localhost:8080/plans');
                setPlans(response.data);
                console.log('Fetched plans:', response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPlans();
    }, []);

    const navigate = useNavigate();

    const handleRowClick = (plan) => {
        navigate('/payment', { state: { plan } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900">
            <div className="h-[700px] w-full flex">
                <div className="w-1/3 bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white mt-20">
                    <h2 className="ml-9 mt-2 font-bold text-3xl">Browse mobile recharge plans</h2>
                    <img src={img} alt="mobile" className="w-[250px] mt-14 ml-32" />
                </div>
                <div className="w-2/3 bg-gradient-to-b from-black via-gray-950 to-gray-900 mt-16">
                    <div className="relative overflow-hidden py-2 px-4 mt-3 w-[85%] mx-auto">
                        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hidden text-2xl">
                            <a href="#data" className="inline-block px-4 py-2 mr-2 text-white no-underline rounded hover:text-purple-500 hover:underline hover:underline-offset-4 focus:text-purple-300 focus:underline focus:underline-offset-4 transition duration-300">Data</a>
                            <a href="#truly-unlimited" className="inline-block px-4 py-2 mr-2 text-white no-underline rounded hover:text-purple-500 hover:underline hover:underline-offset-4 focus:text-purple-300 focus:underline focus:underline-offset-4 transition duration-300">Truly Unlimited</a>
                            <a href="#talktime" className="inline-block px-4 py-2 mr-2 text-white no-underline rounded hover:text-purple-500 hover:underline hover:underline-offset-4 focus:text-purple-300 focus:underline focus:underline-offset-4 transition duration-300">TalkTime</a>
                            <a href="#cricket-packs" className="inline-block px-4 py-2 mr-2 text-white no-underline rounded hover:text-purple-500 hover:underline hover:underline-offset-4 focus:text-purple-300 focus:underline focus:underline-offset-4 transition duration-300">Cricket Packs</a>
                            <a href="#international-roaming" className="inline-block px-4 py-2 mr-2 text-white no-underline rounded hover:text-purple-500 hover:underline hover:underline-offset-4 focus:text-purple-300 focus:underline focus:underline-offset-4 transition duration-300">International Roaming</a>
                            <a href="#inflight-roaming" className="inline-block px-4 py-2 mr-2 text-white no-underline rounded hover:text-purple-500 hover:underline hover:underline-offset-4 focus:text-purple-300 focus:underline focus:underline-offset-4 transition duration-300">Inflight Roaming pack</a>
                            <a href="#plan-vouchers" className="inline-block px-4 py-2 mr-2 text-white no-underline rounded hover:text-purple-500 hover:underline hover:underline-offset-4 focus:text-purple-300 focus:underline focus:underline-offset-4 transition duration-300">Plan Vouchers</a>
                        </div>
                    </div>
                    <div className="mt-9 w-[85%] mx-auto">
                        <div className="overflow-x-auto h-[500px]">
                            <table className="min-w-full bg-white shadow-md overflow-hidden">
                                <thead className="bg-gray-950 text-white sticky top-0">
                                    <tr>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-xl">Name</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-xl">Price</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-xl">Validity</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-xl">Data</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-xl">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {Plans.map(plan => (
                                        <tr 
                                            key={plan.id} 
                                            className="bg-gray-100 even:bg-gray-200 text-xl cursor-pointer"
                                            onClick={() => handleRowClick(plan)}
                                        >
                                            <td className="py-2 px-4">{plan.name}</td>
                                            <td className="py-2 px-4">${plan.amount}</td>
                                            <td className="py-2 px-4">{plan.validity}</td>
                                            <td className="py-2 px-4">{plan.data} GB</td>
                                            <td className="py-2 px-4 items-center">
                                                <div className="bg-black text-white font-semibold text-xl w-20 text-center border rounded-lg mt-5">
                                                    ${plan.amount}
                                                </div>
                                                <div className="mt-3">
                                                    <a href="#" className="text-sm text-purple-500 mt-9">
                                                        View Details
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
