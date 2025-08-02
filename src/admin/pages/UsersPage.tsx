import React from 'react';
import { useQuery, useMutation } from 'react-query';
import { getUsers, deleteUser } from '../../services/adminApi';
import { toast } from 'react-toastify';
import UsersList from '../../components/users/UsersList';

const UsersPage = () => {
  const { data: users, isLoading, refetch } = useQuery(['users'], getUsers);
  const { mutateAsync: deleteUserMutate, isLoading: isDeleting } = useMutation(deleteUser);

  const handleDelete = async (id: number) => {
    try {
      await deleteUserMutate(id);
      toast.success('User deleted successfully!');
      refetch();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete user.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>
      <UsersList users={users} onDelete={handleDelete} />
    </div>
  );
};

export default UsersPage;