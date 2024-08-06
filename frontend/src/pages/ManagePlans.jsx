import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Admin/Sidebar';

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/plans')
      .then(response => {
        setPlans(response.data);
      })
      .catch(error => {
        console.error('Error fetching plans:', error);
        setError('Error fetching plans. Please try again later.');
      });
  }, []);

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-[89vh] bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white ">
      <div className="flex h-[89vh]">
      <Sidebar />
        <main className="w-3/4 p-6 h-[80.5vh]">
          <h1 className="text-2xl font-bold mb-4 text-center">Manage Plans</h1>
          <div className="overflow-auto h-[calc(100vh-200px)]">
            <table className="min-w-full bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white">
              <thead>
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Validity</th>
                  <th className="py-2 px-4">Data</th>
                  <th className="py-2 px-4">Type</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map(plan => (
                  <tr key={plan.id}>
                    <td className="border px-4 py-2">{plan.name}</td>
                    <td className="border px-4 py-2">Rs. {plan.amount}</td>
                    <td className="border px-4 py-2">{plan.validity}</td>
                    <td className="border px-4 py-2">{plan.data} MB</td>
                    <td className="border px-4 py-2">{plan.type}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                        onClick={() => onEdit(plan)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded"
                        onClick={() => onDelete(plan.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagePlans;