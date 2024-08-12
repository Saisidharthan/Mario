import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="md:w-1/4 bg-gray-950 p-6 h-full flex flex-col justify-between">
      <div>
        <h2 className="text-white text-xl font-semibold mb-6 text-center">Admin Panel</h2>
        <nav className="space-y-4">
            <Link to="/admin" className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition duration-200">
            Dashboard
            </Link>
            <Link to="/manageusers" className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition duration-200">
            Manage User Details
            </Link>
            <Link to="/manageplans" className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition duration-200">
            Manage Plan Details
            </Link>
            <Link to="/managequeries" className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition duration-200">
            Manage Consumer Queries
            </Link>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar