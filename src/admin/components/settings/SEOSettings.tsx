import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import { getSEOSettings, updateSEOSettings } from '../../services/adminApi';
import { toast } from 'react-toastify';

interface SEOSettings {
  metaTags: {
    title: string;
    description: string;
    keywords: string[];
  };
  googleAnalytics: string;
  searchConsole: string;
}

const SEOSettings = () => {
  const { data: settings, isLoading, refetch } = useQuery(['seoSettings'], getSEOSettings);
  const { mutateAsync: updateSettingsMutate, isLoading: isUpdating } = useMutation(updateSEOSettings);

  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [googleAnalytics, setGoogleAnalytics] = useState('');
  const [searchConsole, setSearchConsole] = useState('');

  useEffect(() => {
    if (settings) {
      setMetaTitle(settings.metaTags.title);
      setMetaDescription(settings.metaTags.description);
      setMetaKeywords(settings.metaTags.keywords.join(', '));
      setGoogleAnalytics(settings.googleAnalytics);
      setSearchConsole(settings.searchConsole);
    }
  }, [settings]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await updateSettingsMutate({
        metaTags: {
          title: metaTitle,
          description: metaDescription,
          keywords: metaKeywords.split(', ').filter(keyword => keyword.trim() !== ''),
        },
        googleAnalytics,
        searchConsole,
      });
      toast.success('SEO settings updated successfully!');
      refetch();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update SEO settings.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">SEO Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="metaTitle" className="block text-gray-700 font-bold mb-2">Meta Title</label>
          <input
            type="text"
            id="metaTitle"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="metaDescription" className="block text-gray-700 font-bold mb-2">Meta Description</label>
          <textarea
            id="metaDescription"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="metaKeywords" className="block text-gray-700 font-bold mb-2">Meta Keywords</label>
          <input
            type="text"
            id="metaKeywords"
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="googleAnalytics" className="block text-gray-700 font-bold mb-2">Google Analytics</label>
          <input
            type="text"
            id="googleAnalytics"
            value={googleAnalytics}
            onChange={(e) => setGoogleAnalytics(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="searchConsole" className="block text-gray-700 font-bold mb-2">Search Console</label>
          <input
            type="text"
            id="searchConsole"
            value={searchConsole}
            onChange={(e) => setSearchConsole(e.target.value)}
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

export default SEOSettings;