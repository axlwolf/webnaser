import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersList from '../../components/users/UsersList';
import { AdminUser } from '../../types/admin.types';
import { getAllUsers } from '../../services/userService';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (id: number) => {
    navigate(`/admin/users/${id}/edit`);
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <UsersList users={users} onEdit={handleEditUser} />
    </div>
  );
};

export default UsersPage;
