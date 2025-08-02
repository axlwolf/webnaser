import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@headlessui/react';

interface BackupSettingsFormInputs {
  backupFrequency: string;
  backupLocation: string;
  lastBackup: string;
}

const BackupSettings: React.FC = () => {
  const [settings, setSettings] = useState<BackupSettingsFormInputs | null>(null);
  const { register, handleSubmit, setValue } = useForm<BackupSettingsFormInputs>();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Placeholder for fetching settings from API
        const response = {
          backupFrequency: 'daily',
          backupLocation: '/backups/',
          lastBackup: '2023-07-31T15:30:00Z',
        };
        setSettings(response);
        setValue('backupFrequency', response.backupFrequency);
        setValue('backupLocation', response.backupLocation);
        setValue('lastBackup', response.lastBackup);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, [setValue]);

  const onSubmit = async (data: BackupSettingsFormInputs) => {
    try {
      // Placeholder for updating settings in API
      console.log('Updated settings:', data);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <div>
      <h2>Configuraciones de Backup</h2>
      {settings && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='backupFrequency'>Frecuencia de Backup:</label>
            <select id='backupFrequency' {...register('backupFrequency')} required >{}
              <option value='daily'>Diario</option>
              <option value='weekly'>Semanal</option>
              <option value='monthly'>Mensual</option>
            </select>
          </div>
          <div>
            <label htmlFor='backupLocation'>Ubicación de Backup:</label>
            <input id='backupLocation' {...register('backupLocation')} required />{}
          </div>
          <div>
            <label htmlFor='lastBackup'>Último Backup:</label>
            <input id='lastBackup' type='datetime-local' {...register('lastBackup')} required />{}
          </div>
          <Button type='submit' className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>Guardar</Button>
        </form>
      )}
    </div>
  );
};

export default BackupSettings;
