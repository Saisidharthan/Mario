import { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { UserContext } from "../context/UserContext";
import Sidebar from "../components/Admin/Sidebar";
import { BarChart, XAxis, YAxis, Bar, Legend, CartesianGrid } from "recharts";

const AdminDashboard = () => {
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [planData, setPlanData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const { axiosInstance } = useContext(UserContext);

    
    
    
    const COLORS = ['#FF204E', '#FFD369', '#AE00FB', '#7C00FE', '#F9E400','#F9E400'];
    
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const userResponse = await axiosInstance.get('http://localhost:8080/auth/userCount');
                setTotalCustomers(userResponse.data);
                
                const productResponse = await axiosInstance.get('http://localhost:8080/plans/planCount');
                setTotalProducts(productResponse.data);
                
                const commentResponse = await axiosInstance.get('http://localhost:8080/contactCount');
                setTotalComments(commentResponse.data);

                const plansByTypeResponse = await axiosInstance.get('http://localhost:8080/plans/countByType');
                const formattedPlanData = Object.entries(plansByTypeResponse.data).map(([type, count]) => ({
                    sector: type,
                    planCount: count,
                }));
                setPlanData(formattedPlanData);
                const dataResponse = await axiosInstance.get('http://localhost:8080/purchase/planCount/DATA');
                const talktimeResponse = await axiosInstance.get('http://localhost:8080/purchase/planCount/TALKTIME');
                const internationalRoamingResponse = await axiosInstance.get('http://localhost:8080/purchase/planCount/INTERNATIONALROAMING');
                const unlimitedResponse = await axiosInstance.get('http://localhost:8080/purchase/planCount/UNLIMITED');
                const entertainmentResponse = await axiosInstance.get('http://localhost:8080/purchase/planCount/ENTERTAINMENT');
                const othersResponse = await axiosInstance.get('http://localhost:8080/purchase/planCount/OTHERS');

                setPieData([
                    { name: 'DATA', value: dataResponse.data },
                    { name: 'TALKTIME', value: talktimeResponse.data },
                    { name: 'INTERNATIONALROAMING', value: internationalRoamingResponse.data },
                    { name: 'UNLIMITED', value: unlimitedResponse.data },
                    { name: 'ENTERTAINMENT', value: entertainmentResponse.data },
                    { name: 'OTHERS', value: othersResponse.data },
                ]);
                console.log(pieData);
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, [axiosInstance]);

    return (
        <div className="min-h-[90.25vh] bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white">
            <div className="flex md:flex-row flex-col">
                <Sidebar />
                <main className="md:w-3/4 p-6">
                    <h1 className="text-3xl font-semibold mb-6 text-center white">Admin Dashboard</h1>
                    <div className="grid md:grid-cols-3 gap-6 text-center p-2">
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Total Customers</h2>
                            <p className="text-5xl font-bold">{totalCustomers}</p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Total Plans</h2>
                            <p className="text-5xl font-bold">{totalProducts}</p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Total Queries</h2>
                            <p className="text-5xl font-bold">{totalComments}</p>
                        </div>
                    </div>
                    <div className="w-full md:px-8 lg:px-16 h-full">
                        <h2 className="text-2xl md:text-3xl font-semibold my-6 md:my-10 text-center text-white">
                            Plans by Sector
                        </h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={planData} margin={{ top: 20, right: 30, left: 20, bottom: 150 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#555555" />
                            <XAxis 
                                dataKey="sector" 
                                stroke="#ffffff" 
                                tick={{ fill: '#ffffff' }} 
                                angle={-90} 
                                dy={10} 
                                dx={-10} // Adjust horizontal position
                                textAnchor="end"
                            />
                            <YAxis stroke="#ffffff" />
                            <Tooltip contentStyle={{ backgroundColor: '#006666', border: 'none' }} />
                            <Bar dataKey="planCount" fill="#C738BD" barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-full my-10 hidden md:block">
                        <h2 className="text-3xl font-semibold text-center text-white">Plan Purchase Distribution</h2>
                        <ResponsiveContainer width="100%" height={350} className="mt-10">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={60}
                                    outerRadius={125}
                                    paddingAngle={8}
                                    dataKey="value"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
