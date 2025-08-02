import React from 'react';
import { AdminUser } from '../../../types/admin.types';
import Button from '@headlessui/react';

interface UsersListProps {
  users: AdminUser[];
  onEdit: (id: number) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, onEdit }) => {
  return (
    <div className='grid grid-cols-1 gap-4'>
      {users.map((user) => (
        <div key={user.id} className='p-4 border rounded shadow'>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>Rol: {user.role}</p>
          <Button
            onClick={() => onEdit(user.id)}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Editar
          </Button>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
