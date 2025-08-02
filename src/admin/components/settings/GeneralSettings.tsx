import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import { getGeneralSettings, updateGeneralSettings } from '../../services/adminApi';
import { toast } from 'react-toastify';

interface GeneralSettings {
  siteName: string;
  logoUrl: string;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
}

const GeneralSettings = () => {
  const { data: settings, isLoading, refetch } = useQuery(['generalSettings'], getGeneralSettings);
  const { mutateAsync: updateSettingsMutate, isLoading: isUpdating } = useMutation(updateGeneralSettings);

  const [siteName, setSiteName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (settings) {
      setSiteName(settings.siteName);
      setLogoUrl(settings.logoUrl);
      setAddress(settings.contactInfo.address);
      setPhone(settings.contactInfo.phone);
      setEmail(settings.contactInfo.email);
    }
  }, [settings]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await updateSettingsMutate({ siteName, logoUrl, contactInfo: { address, phone, email } });
      toast.success('General settings updated successfully!');
      refetch();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update general settings.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">General Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="siteName" className="block text-gray-700 font-bold mb-2">Site Name</label>
          <input
            type="text"
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="logoUrl" className="block text-gray-700 font-bold mb-2">Logo URL</label>
          <input
            type="text"
            id="logoUrl"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default GeneralSettings;