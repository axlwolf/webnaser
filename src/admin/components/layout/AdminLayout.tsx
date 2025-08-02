import React from 'react';
import Sidebar from '../layout/Sidebar';
import TopBar from '../layout/TopBar';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex flex-col flex-grow'>
        <TopBar />
        <main className='p-4'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
