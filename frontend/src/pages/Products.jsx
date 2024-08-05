import axios from "axios";
import { useEffect, useState } from "react";
import img from '../assets/img-1.jpg'; 
import { useLocation, useNavigate } from "react-router-dom";

const Products = () => {
    const location = useLocation();
    const [Plans, setPlans] = useState([]);
    const { phoneNumber } = location.state || {};
    const [selectedPlanType, setSelectedPlanType] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('http://localhost:8080/plans');
                setPlans(response.data);
                setLoading(false);
                console.log('Fetched plans:', response.data);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const navigate = useNavigate();

    const handleRowClick = (plan) => {
        navigate('/checkout', { state: { plan, phoneNumber } });
    };

    const handlePlanTypeClick = (type) => {
        setSelectedPlanType(type);
        console.log('Selected plan type:', type);
        console.log('Filtered plans:', Plans.filter(plan => plan.type === type));
    };

    const filteredPlans = selectedPlanType ? Plans.filter(plan => plan.type === selectedPlanType) : Plans;

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <>
            <div className="min-h-[60vh] bg-gradient-to-b from-black via-gray-950 to-gray-900">
                <div className="h-[88.5vh] w-full flex">
                    <div className="w-1/3 bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white mt-12">
                        <h2 className="ml-9 mt-2 font-bold text-3xl">Browse mobile recharge plans</h2>
                        <img src={img} alt="mobile" className="w-[250px] mt-14 ml-32" />
                    </div>
                    <div className="w-2/3 bg-gradient-to-b from-black via-gray-950 to-gray-900 mt-8">
                        <div className="relative overflow-hidden py-2 px-4 mt-3 w-[85%] mx-auto">
                            <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hidden text-2xl">
                                <button
                                    onClick={() => handlePlanTypeClick('DATA')}
                                    className={`inline-block px-4 py-2 mr-2 text-white no-underline rounded ${selectedPlanType === 'DATA' ? 'text-purple-500 underline underline-offset-4' : 'hover:text-purple-500 hover:underline hover:underline-offset-4 focus:text-purple-300 focus:underline focus:underline-offset-4'} transition duration-300`}
                                >
                                    Data
                                </button>
                                <button
                                    onClick={() => handlePlanTypeClick('UNLIMITED')}
                                    className={`inline-block px-4 py-2 mr-2 text-white no-underline rounded ${selectedPlanType === 'UNLIMITED' ? 'text-purple-500 underline underline-offset-4' : 'hover:text-purple-500 hover:underline hover:underline-offset-4 focus:text-purple-300 focus:underline focus:underline-offset-4'} transition duration-300`}
                                >
                                    Truly Unlimited
                                </button>
                                <button
                                    onClick={() => handlePlanTypeClick('TALKTIME')}
                                    className={`inline-block px-4 py-2 mr-2 text-white no-underline rounded ${selectedPlanType === 'TALKTIME' ? 'text-purple-500 underline underline-offset-4' : 'hover:text-purple-500 hover:underline hover:underline-offset-4 focus:text-purple-300 focus:underline focus:underline-offset-4'} transition duration-300`}
                                >
                                    TalkTime
                                </button>
                                <button
                                    onClick={() => handlePlanTypeClick('ENTERTAINMENT')}
                                    className={`inline-block px-4 py-2 mr-2 text-white no-underline rounded ${selectedPlanType === 'ENTERTAINMENT' ? 'text-purple-500 underline underline-offset-4' : 'hover:text-purple-500 hover:underline hover:underline-offset-4 focus:text-purple-300 focus:underline focus:underline-offset-4'} transition duration-300`}
                                >
                                    Entertainment
                                </button>
                                <button
                                    onClick={() => handlePlanTypeClick('INTERNATIONALROAMING')}
                                    className={`inline-block px-4 py-2 mr-2 text-white no-underline rounded ${selectedPlanType === 'INTERNATIONALROAMING' ? 'text-purple-500 underline underline-offset-4' : 'hover:text-purple-500 hover:underline hover:underline-offset-4 focus:text-purple-300 focus:underline focus:underline-offset-4'} transition duration-300`}
                                >
                                    International Roaming
                                </button>
                                <button
                                    onClick={() => handlePlanTypeClick('OTHERS')}
                                    className={`inline-block px-4 py-2 mr-2 text-white no-underline rounded ${selectedPlanType === 'OTHERS' ? 'text-purple-500 underline underline-offset-4' : 'hover:text-purple-500 hover:underline hover:underline-offset-4 focus:text-purple-300 focus:underline focus:underline-offset-4'} transition duration-300`}
                                >
                                    Others
                                </button>
                            </div>
                        </div>
                        <div className="mt-9 w-[85%] mx-auto">
                            <div className="relative h-[500px] overflow-auto">
                                <table className="min-w-full bg-white shadow-md">
                                    <thead className="bg-gray-950 text-white sticky top-0">
                                        <tr>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-xl">Name</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-xl">Price</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-xl">Validity</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-xl">Data</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-xl">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="overflow-y-auto h-[400px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                                        {filteredPlans.map(plan => (
                                            <tr key={plan.id} className="bg-gray-100 even:bg-gray-200 text-xl">
                                                <td className="py-2 px-4">{plan.name}</td>
                                                <td className="py-2 px-4"><span>&#x20B9;</span>{plan.amount}</td>
                                                <td className="py-2 px-4">{plan.validity}</td>
                                                <td className="py-2 px-4">{plan.data} GB</td>
                                                <td className="py-0 px-4 items-center">
                                                    <div className="bg-black text-white font-semibold text-xl w-20 text-center border rounded-lg mt-5 cursor-pointer" onClick={() => handleRowClick(plan)}>
                                                        &#8377;{plan.amount}
                                                    </div>
                                                    <div className="mt-3">
                                                        <button className="text-sm text-purple-500 ">
                                                            View Details
                                                        </button>
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
        </>
    );
}

export default Products;
