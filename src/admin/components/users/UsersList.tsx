import React from 'react';
import { Link } from 'react-router-dom';
import { AdminUser } from '../../types/admin.types';

interface Props {
  users: AdminUser[];
  onDelete: (id: number) => void;
}

const UsersList = ({ users, onDelete }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map((user) => (
        <div key={user.id} className="bg-white p-4 rounded-lg shadow-md relative">
          <h3 className="text-lg font-bold mb-2">{user.name}</h3>
          <p className="text-gray-500 mb-2">Email: {user.email}</p>
          <p className="text-gray-500 mb-2">Role: {user.role}</p>
          <p className="text-gray-500 mb-2">Last Login: {user.lastLogin}</p>
          <p className="text-gray-500 mb-2">Created At: {user.createdAt}</p>
          <div className="mt-4">
            <Link to={`/users/${user.id}/edit`} className="text-blue-500 font-bold">Edit</Link>
            <button
              type="button"
              onClick={() => onDelete(user.id)}
              className="ml-2 bg-red-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;