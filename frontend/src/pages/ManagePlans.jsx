import { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Admin/Sidebar';
import { UserContext } from '../context/UserContext';

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({ id: '', name: '', amount: '', validity: '', data: '', type: '' });
  const { axiosInstance } = useContext(UserContext);

  useEffect(() => {
    axiosInstance.get('http://localhost:8080/plans')
      .then(response => {
        setPlans(response.data);
      })
      .catch(error => {
        console.error('Error fetching plans:', error);
        setError('Error fetching plans. Please try again later.');
      });
  }, [axiosInstance,plans]);

  const onDelete = (id) => {
    axiosInstance.delete(`http://localhost:8080/plandelete/${id}`)
      .then(() => {
        setPlans(plans.filter(plan => plan.id !== id));
      })
      .catch(error => {
        console.error('Error deleting plan:', error);
        setError('Error deleting plan. Please try again later.');
      });
  }

  const handleAddPlans = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newPlan);
    
    axiosInstance.post('http://localhost:8080/plans', newPlan)
      .then(response => {
        setPlans([...plans, response.data]);
        setIsAddModalOpen(false);
        setNewPlan({ id: '', name: '', amount: '', validity: '', data: '', type: '' });
      })
      .catch(error => {
        console.error('Error adding plan:', error);
        setError('Error adding plan. Please try again later.');
      });
  };

  const onEdit = (plan) => {
    setNewPlan(plan);
    setIsAddModalOpen(true);
  };

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-[89vh] bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white">
      <div className="flex h-[89vh]">
        <Sidebar />
        <main className="w-3/4 p-6 h-[80.5vh]">
          <div className='flex justify-between items-center mb-4'>
            <h1 className="text-2xl font-bold text-center flex-1">Manage Plans</h1>
            <button
              className="bg-blue-500 text-white py-1 ml-3 mr-4 rounded w-32 text-lg hover:bg-blue-800"
              onClick={handleAddPlans}
            >
              Add Plans
            </button>
          </div>
          {isAddModalOpen && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-75 z-40" />
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-xl">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-4xl mr-3"
                    onClick={handleCloseModal}
                  >
                    &times;
                  </button>
                  <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text text-center">Add Plan</h2>
                  <form onSubmit={handleSubmit} className='text-black'>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">ID</label>
                      <input
                        type="text"
                        name="id"
                        value={newPlan.id}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newPlan.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">Amount</label>
                      <input
                        type="number"
                        name="amount"
                        value={newPlan.amount}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="validity">Validity</label>
                      <input
                        type="text"
                        name="validity"
                        value={newPlan.validity}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="data">Data</label>
                      <input
                        type="text"
                        name="data"
                        value={newPlan.data}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">Type</label>
                      <select
                        name="type"
                        value={newPlan.type}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      >
                        <option value="" disabled selected>Select Plan Type</option>
                        <option value="UNLIMITED">UNLIMITED</option>
                        <option value="DATA">DATA</option>
                        <option value="TALKTIME">TALKTIME</option>
                        <option value="ENTERTAINMENT">ENTERTAINMENT</option>
                        <option value="INTERNATIONALROAMING">INTERNATIONALROAMING</option>
                        <option value="OTHERS">OTHERS</option>
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Add</button>
                      <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700" onClick={handleCloseModal}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
          <div className="overflow-auto h-[calc(100vh-200px)]">
            <table className="min-w-full bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white">
              <thead>
                <tr>
                  <th className="py-2 px-4">ID</th>
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
                    <td className="border px-4 py-2">{plan.id}</td>
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

export default ManagePlans;