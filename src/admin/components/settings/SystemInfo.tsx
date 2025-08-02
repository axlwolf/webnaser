import React, { useEffect, useState } from 'react';

interface SystemInfo {
  diskUsage: number;
  memoryUsage: number;
  uptime: string;
  lastBackup: string;
}

const SystemInfo: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        // Placeholder for fetching system info from API
        const response = {
          diskUsage: 20,
          memoryUsage: 50,
          uptime: '7 days',
          lastBackup: '2023-07-31T15:30:00Z',
        };
        setSystemInfo(response);
      } catch (error) {
        console.error('Error fetching system info:', error);
      }
    };

    fetchSystemInfo();
  }, []);

  return (
    <div>
      <h2>Información del Sistema</h2>
      {systemInfo && (
        <div>
          <p>Uso de Disco: {systemInfo.diskUsage}%</p>
          <p>Uso de Memoria: {systemInfo.memoryUsage}%</p>
          <p>Tiempo de Actividad: {systemInfo.uptime}</p>
          <p>Último Backup: {systemInfo.lastBackup}</p>
        </div>
      )}
    </div>
  );
};

export default SystemInfo;