import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import { getBackupSettings, updateBackupSettings } from '../../services/adminApi';
import { toast } from 'react-toastify';

interface BackupSettings {
  backupFrequency: string;
  backupRetention: number;
  lastBackup: string;
}

const BackupSettings = () => {
  const { data: settings, isLoading, refetch } = useQuery(['backupSettings'], getBackupSettings);
  const { mutateAsync: updateSettingsMutate, isLoading: isUpdating } = useMutation(updateBackupSettings);

  const [backupFrequency, setBackupFrequency] = useState('');
  const [backupRetention, setBackupRetention] = useState(0);

  useEffect(() => {
    if (settings) {
      setBackupFrequency(settings.backupFrequency);
      setBackupRetention(settings.backupRetention);
    }
  }, [settings]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await updateSettingsMutate({ backupFrequency, backupRetention });
      toast.success('Backup settings updated successfully!');
      refetch();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update backup settings.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Backup Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="backupFrequency" className="block text-gray-700 font-bold mb-2">Backup Frequency</label>
          <input
            type="text"
            id="backupFrequency"
            value={backupFrequency}
            onChange={(e) => setBackupFrequency(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="backupRetention" className="block text-gray-700 font-bold mb-2">Backup Retention (days)</label>
          <input
            type="number"
            id="backupRetention"
            value={backupRetention}
            onChange={(e) => setBackupRetention(parseInt(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          disabled={isUpdating}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isUpdating ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {isUpdating ? 'Updating...' : 'Update Settings'}
        </button>
      </form>
    </div>
  );
};

export default BackupSettings;