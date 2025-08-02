import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className='w-64 bg-gray-800 text-white p-4'>
      <h2 className='text-lg font-bold mb-4'>Menu</h2>
      <nav className='space-y-2'>
        <a href='/dashboard' className='block py-2 px-4 hover:bg-gray-700 rounded'>Dashboard</a>
        <a href='/pages' className='block py-2 px-4 hover:bg-gray-700 rounded'>Pages</a>
        <a href='/services' className='block py-2 px-4 hover:bg-gray-700 rounded'>Services</a>
        <a href='/locations' className='block py-2 px-4 hover:bg-gray-700 rounded'>Locations</a>
        <a href='/media' className='block py-2 px-4 hover:bg-gray-700 rounded'>Media</a>
        <a href='/users' className='block py-2 px-4 hover:bg-gray-700 rounded'>Users</a>
        <a href='/settings' className='block py-2 px-4 hover:bg-gray-700 rounded'>Settings</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
