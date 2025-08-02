import React from 'react';
import { useQuery } from 'react-query';
import { getSystemInfo } from '../../services/adminApi';

interface SystemInfo {
  diskUsage: number;
  memoryUsage: number;
  uptime: string;
  lastBackup: string;
  logs: string[];
  maintenanceMode: boolean;
}

const SystemInfo = () => {
  const { data: info, isLoading } = useQuery(['systemInfo'], getSystemInfo);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">System Info</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Disk Usage</label>
        <span className="text-gray-500">{info?.diskUsage} GB</span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Memory Usage</label>
        <span className="text-gray-500">{info?.memoryUsage}%</span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Uptime</label>
        <span className="text-gray-500">{info?.uptime}</span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Last Backup</label>
        <span className="text-gray-500">{info?.lastBackup}</span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Logs</label>
        <textarea
          value={info?.logs.join('\n')}
          readOnly
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={10}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={info?.maintenanceMode}
            onChange={() => {}} // Handle maintenance mode toggle
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">Maintenance Mode</span>
        </label>
      </div>
    </div>
  );
};

export default SystemInfo;