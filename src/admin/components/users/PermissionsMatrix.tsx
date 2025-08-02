import React from 'react';
import { AdminUser } from '../../../types/admin.types';
import { useForm } from 'react-hook-form';
import Button from '@headlessui/react';

interface PermissionsMatrixProps {
  user: AdminUser;
  onUpdatePermissions: (permissions: string[]) => void;
}

const PermissionsMatrix: React.FC<PermissionsMatrixProps> = ({ user, onUpdatePermissions }) => {
  const { register, handleSubmit } = useForm<{ permissions: string }>();

  const onSubmit = (data: { permissions: string }) => {
    onUpdatePermissions(data.permissions.split(',').map(permission => permission.trim()));
  };

  return (
    <div>
      <h2>Gestionar Permisos</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='permissions'>Permisos (separados por comas):</label>
          <input id='permissions' {...register('permissions')} required />{}
        </div>
        <Button type='submit' className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>Actualizar Permisos</Button>
      </form>
    </div>
  );
};

export default PermissionsMatrix;
