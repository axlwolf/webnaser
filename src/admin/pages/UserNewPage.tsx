import React from 'react';
import UserEditor from '../../components/users/UserEditor';

const UserNewPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create New User</h1>
      <UserEditor />
    </div>
  );
};

export default UserNewPage;