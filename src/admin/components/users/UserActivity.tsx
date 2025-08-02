import React from 'react';
import { AdminUser } from '../../../types/admin.types';

interface UserActivityProps {
  user: AdminUser;
}

const UserActivity: React.FC<UserActivityProps> = ({ user }) => {
  return (
    <div>
      <h2>Actividad del Usuario</h2>
      <p>Último inicio de sesión: {user.lastLogin}</p>
      <p>Cuenta creada el: {user.createdAt}</p>
    </div>
  );
};

export default UserActivity;
