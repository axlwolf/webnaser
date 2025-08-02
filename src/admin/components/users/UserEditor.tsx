import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminUser } from '../../../types/admin.types';
import { getUserById, updateUser } from '../../services/userService';
import { useForm } from 'react-hook-form';
import Button from '@headlessui/react';

interface UserFormInputs {
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
  permissions: string;
  isActive: boolean;
}

const UserEditor: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(null);
  const { register, handleSubmit, setValue } = useForm<UserFormInputs>();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await getUserById(Number(id));
          setUser(response.data);
          setValue('name', response.data.name);
          setValue('email', response.data.email);
          setValue('role', response.data.role);
          setValue('permissions', response.data.permissions.join(','));
          setValue('isActive', response.data.isActive);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };

      fetchUser();
    }
  }, [id, setValue]);

  const onSubmit = async (data: UserFormInputs) => {
    try {
      const updatedUser = {
        ...data,
        permissions: data.permissions.split(',').map(permission => permission.trim()),
      };

      if (id) {
        await updateUser(Number(id), updatedUser);
      }
      navigate('/admin/users');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h1>Editar Usuario</h1>
      {user && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='name'>Nombre:</label>
            <input id='name' {...register('name')} required />{}
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input id='email' {...register('email')} required />{}
          </div>
          <div>
            <label htmlFor='role'>Rol:</label>
            <select id='role' {...register('role')} required >{}
              <option value='super_admin'>Super Admin</option>
              <option value='admin'>Admin</option>
              <option value='editor'>Editor</option>
              <option value='viewer'>Viewer</option>
            </select>
          </div>
          <div>
            <label htmlFor='permissions'>Permisos (separados por comas):</label>
            <input id='permissions' {...register('permissions')} required />{}
          </div>
          <div>
            <label htmlFor='isActive'>Activo:</label>
            <input id='isActive' type='checkbox' {...register('isActive')} />{}
          </div>
          <Button type='submit' className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>Guardar</Button>
        </form>
      )}
    </div>
  );
};

export default UserEditor;
