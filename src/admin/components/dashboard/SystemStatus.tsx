import React from 'react';
import { DashboardStats } from '../../types/admin.types';

interface Props {
  status: {
    diskUsage: number;
    memoryUsage: number;
    uptime: string;
    lastBackup: string;
  };
}

const SystemStatus = ({ status }: Props) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">System Status</h2>
      <div className="space-y-2">
        <p><strong>Disk Usage:</strong> {status.diskUsage} GB</p>
        <p><strong>Memory Usage:</strong> {status.memoryUsage}%</p>
        <p><strong>Uptime:</strong> {status.uptime}</p>
        <p><strong>Last Backup:</strong> {status.lastBackup}</p>
      </div>
    </div>
  );
};

export default SystemStatus;