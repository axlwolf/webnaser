import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { getUser, updateUser, createUser } from '../../services/adminApi';
import { toast } from 'react-toastify';
import RoleManager from './RoleManager';
import PermissionsMatrix from './PermissionsMatrix';

interface AdminUser {
  id?: number;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
  permissions: string[];
  lastLogin: string;
  isActive: boolean;
  createdAt: string;
}

const UserEditor = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'super_admin' | 'admin' | 'editor' | 'viewer'>('viewer');
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);

  const { data: user, isLoading, refetch } = useQuery(['user', id], () => getUser(Number(id)), { enabled: !!id });
  const { mutateAsync: updateUserMutate, isLoading: isUpdating } = useMutation(updateUser);
  const { mutateAsync: createUserMutate, isLoading: isCreating } = useMutation(createUser);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setPermissions(user.permissions);
      setIsActive(user.isActive);
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (id) {
        await updateUserMutate({ id: Number(id), name, email, role, permissions, isActive });
        toast.success('User updated successfully!');
        refetch();
      } else {
        await createUserMutate({ name, email, role, permissions, isActive });
        toast.success('User created successfully!');
        navigate('/users');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to save user.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit User' : 'Create New User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <RoleManager
          role={role}
          onChange={setRole}
        />
        <PermissionsMatrix
          permissions={permissions}
          onChange={setPermissions}
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Active</span>
          </label>
        </div>
        <button
          type="submit"
          disabled={isUpdating || isCreating}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isUpdating || isCreating ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {isUpdating || isCreating ? 'Updating...' : 'Update Settings'}
        </button>
      </form>
    </div>
  );
};

export default UserEditor;