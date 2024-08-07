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
  }, [axiosInstance]);

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-[89vh] bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white ">
      <div className="flex h-[89vh]">
      <Sidebar />
        <main className="w-3/4 p-6 h-[80.5vh]">
          <h1 className="text-2xl font-bold mb-4 text-center">Manage Customer Queries</h1>
          <div className="overflow-auto h-[calc(100vh-200px)]">
            <table className="min-w-full bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white">
              <thead>
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Message</th>
                </tr>
              </thead>
              <tbody>
                {queries.map(query => (
                  <tr key={query.id}>
                    <td className="border px-4 py-2">{query.name}</td>
                    <td className="border px-4 py-2">{query.email}</td>
                    <td className="border px-4 py-2">{query.message}</td>
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