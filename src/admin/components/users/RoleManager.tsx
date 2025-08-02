import React from 'react';
import { AdminUser } from '../../../types/admin.types';
import { useForm } from 'react-hook-form';
import Button from '@headlessui/react';

interface RoleManagerProps {
  user: AdminUser;
  onUpdateRole: (role: 'super_admin' | 'admin' | 'editor' | 'viewer') => void;
}

const RoleManager: React.FC<RoleManagerProps> = ({ user, onUpdateRole }) => {
  const { register, handleSubmit } = useForm<{ role: 'super_admin' | 'admin' | 'editor' | 'viewer' }>();

  const onSubmit = (data: { role: 'super_admin' | 'admin' | 'editor' | 'viewer' }) => {
    onUpdateRole(data.role);
  };

  return (
    <div>
      <h2>Gestionar Rol</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='role'>Rol:</label>
          <select id='role' {...register('role')} required >{}
            <option value='super_admin'>Super Admin</option>
            <option value='admin'>Admin</option>
            <option value='editor'>Editor</option>
            <option value='viewer'>Viewer</option>
          </select>
        </div>
        <Button type='submit' className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>Actualizar Rol</Button>
      </form>
    </div>
  );
};

export default RoleManager;
