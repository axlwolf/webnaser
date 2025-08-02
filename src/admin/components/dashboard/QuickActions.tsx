import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/pages/new" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Create New Page
        </Link>
        <Link to="/services/new" className="bg-green-500 text-white font-bold py-2 px-4 rounded">
          Create New Service
        </Link>
        <Link to="/locations/new" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded">
          Add New Location
        </Link>
        <Link to="/users/new" className="bg-purple-500 text-white font-bold py-2 px-4 rounded">
          Add New User
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;