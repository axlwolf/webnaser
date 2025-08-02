import React from 'react';
import LogoutButton from '../auth/LogoutButton';

const TopBar: React.FC = () => {
  return (
    <header className='bg-gray-900 text-white p-4 flex justify-between items-center'>
      <h1 className='text-lg font-bold'>Admin Dashboard</h1>
      <LogoutButton />
    </header>
  );
};

export default TopBar;
