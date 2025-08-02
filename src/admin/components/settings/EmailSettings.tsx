import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@headlessui/react';

interface EmailSettingsFormInputs {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  emailTemplates: string;
}

const EmailSettings: React.FC = () => {
  const [settings, setSettings] = useState<EmailSettingsFormInputs | null>(null);
  const { register, handleSubmit, setValue } = useForm<EmailSettingsFormInputs>();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Placeholder for fetching settings from API
        const response = {
          smtpHost: 'smtp.example.com',
          smtpPort: 587,
          smtpUser: 'user@example.com',
          smtpPassword: 'password',
          emailTemplates: 'Welcome Email, Reset Password Email',
        };
        setSettings(response);
        setValue('smtpHost', response.smtpHost);
        setValue('smtpPort', response.smtpPort);
        setValue('smtpUser', response.smtpUser);
        setValue('smtpPassword', response.smtpPassword);
        setValue('emailTemplates', response.emailTemplates);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, [setValue]);

  const onSubmit = async (data: EmailSettingsFormInputs) => {
    try {
      // Placeholder for updating settings in API
      console.log('Updated settings:', data);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <div>
      <h2>Configuraciones de Email</h2>
      {settings && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='smtpHost'>SMTP Host:</label>
            <input id='smtpHost' {...register('smtpHost')} required />{}
          </div>
          <div>
            <label htmlFor='smtpPort'>SMTP Port:</label>
            <input id='smtpPort' type='number' {...register('smtpPort')} required />{}
          </div>
          <div>
            <label htmlFor='smtpUser'>SMTP User:</label>
            <input id='smtpUser' {...register('smtpUser')} required />{}
          </div>
          <div>
            <label htmlFor='smtpPassword'>SMTP Password:</label>
            <input id='smtpPassword' type='password' {...register('smtpPassword')} required />{}
          </div>
          <div>
            <label htmlFor='emailTemplates'>Plantillas de Email (separadas por comas):</label>
            <input id='emailTemplates' {...register('emailTemplates')} required />{}
          </div>
          <Button type='submit' className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>Guardar</Button>
        </form>
      )}
    </div>
  );
};

export default EmailSettings;
