import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import { getEmailSettings, updateEmailSettings } from '../../services/adminApi';
import { toast } from 'react-toastify';

interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  templates: {
    welcomeEmail: string;
    forgotPasswordEmail: string;
  };
}

const EmailSettings = () => {
  const { data: settings, isLoading, refetch } = useQuery(['emailSettings'], getEmailSettings);
  const { mutateAsync: updateSettingsMutate, isLoading: isUpdating } = useMutation(updateEmailSettings);

  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState(0);
  const [smtpUser, setSmtpUser] = useState('');
  const [smtpPassword, setSmtpPassword] = useState('');
  const [welcomeEmail, setWelcomeEmail] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  useEffect(() => {
    if (settings) {
      setSmtpHost(settings.smtpHost);
      setSmtpPort(settings.smtpPort);
      setSmtpUser(settings.smtpUser);
      setSmtpPassword(settings.smtpPassword);
      setWelcomeEmail(settings.templates.welcomeEmail);
      setForgotPasswordEmail(settings.templates.forgotPasswordEmail);
    }
  }, [settings]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await updateSettingsMutate({
        smtpHost,
        smtpPort,
        smtpUser,
        smtpPassword,
        templates: {
          welcomeEmail,
          forgotPasswordEmail,
        },
      });
      toast.success('Email settings updated successfully!');
      refetch();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update email settings.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Email Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="smtpHost" className="block text-gray-700 font-bold mb-2">SMTP Host</label>
          <input
            type="text"
            id="smtpHost"
            value={smtpHost}
            onChange={(e) => setSmtpHost(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="smtpPort" className="block text-gray-700 font-bold mb-2">SMTP Port</label>
          <input
            type="number"
            id="smtpPort"
            value={smtpPort}
            onChange={(e) => setSmtpPort(parseInt(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="smtpUser" className="block text-gray-700 font-bold mb-2">SMTP User</label>
          <input
            type="text"
            id="smtpUser"
            value={smtpUser}
            onChange={(e) => setSmtpUser(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="smtpPassword" className="block text-gray-700 font-bold mb-2">SMTP Password</label>
          <input
            type="password"
            id="smtpPassword"
            value={smtpPassword}
            onChange={(e) => setSmtpPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="welcomeEmail" className="block text-gray-700 font-bold mb-2">Welcome Email Template</label>
          <textarea
            id="welcomeEmail"
            value={welcomeEmail}
            onChange={(e) => setWelcomeEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={6}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="forgotPasswordEmail" className="block text-gray-700 font-bold mb-2">Forgot Password Email Template</label>
          <textarea
            id="forgotPasswordEmail"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={6}
          ></textarea>
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

export default EmailSettings;