import { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Admin/Sidebar';
import { UserContext } from '../context/UserContext';

const ManageQueries = () => {
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState(null);
  const {axiosInstance} = useContext(UserContext);

  useEffect(() => {
    axiosInstance.get('http://localhost:8080/getAllContacts')
      .then(response => {
        setQueries(response.data);
      })
      .catch(error => {
        console.error('Error fetching queries:', error);
        setError('Error fetching queries. Please try again later.');
      });
  }, [axiosInstance,queries]);

  const onDelete = (id) => {
    axiosInstance.delete(`http://localhost:8080/deleteContact/${id}`)
      .then(() => {
        setQueries(queries.filter(query => query.id !== id));
      })
      .catch(error => {
        console.error('Error deleting query:', error);
        setError('Error deleting query. Please try again later.');
      });
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white ">
      <div className="flex md:flex-row flex-col">
      <Sidebar />
        <main className="md:w-3/4 p-6 h-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Manage Customer Queries</h1>
          <div className="overflow-auto h-[calc(100vh-200px)]">
            <table className="min-w-full bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 hidden md:table-cell">Name</th>
                  <th className="py-2 px-4 hidden md:table-cell">Email</th>
                  <th className="py-2 px-4">Message</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {queries.map(query => (
                  <tr key={query.id}>
                    <td className="border px-4 py-2 hidden md:table-cell">{query.name}</td>
                    <td className="border px-4 py-2 hidden md:table-cell">{query.email}</td>
                    <td className="border px-4 py-2">{query.message}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded"
                        onClick={() => onDelete(query.id)}
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

export default ManageQueries;