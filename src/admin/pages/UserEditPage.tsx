import React from 'react';
import { useParams } from 'react-router-dom';
import UserEditor from '../../components/users/UserEditor';

const UserEditPage = () => {
  const { id } = useParams<{ id?: string }>();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Edit User</h1>
      <UserEditor id={id ? parseInt(id) : undefined} />
    </div>
  );
};

export default UserEditPage;