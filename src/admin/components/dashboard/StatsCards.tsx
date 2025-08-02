import React from 'react';
import { DashboardStats } from '../../types/admin.types';

interface Props {
  stats: DashboardStats;
}

const StatsCards = ({ stats }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Total Pages</h2>
        <p className="text-4xl font-bold text-gray-800">{stats.pages.total}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Published Pages</h2>
        <p className="text-4xl font-bold text-green-500">{stats.pages.published}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Draft Pages</h2>
        <p className="text-4xl font-bold text-gray-500">{stats.pages.drafts}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Total Services</h2>
        <p className="text-4xl font-bold text-gray-800">{stats.services.total}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Active Locations</h2>
        <p className="text-4xl font-bold text-blue-500">{stats.locations.active}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Disk Usage</h2>
        <p className="text-4xl font-bold text-indigo-500">{stats.system.diskUsage} GB</p>
      </div>
    </div>
  );
};

export default StatsCards;