import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@headlessui/react';

interface SEOSettingsFormInputs {
  metaTitle: string;
  metaDescription: string;
  googleAnalytics: string;
  searchConsole: string;
}

const SEOSettings: React.FC = () => {
  const [settings, setSettings] = useState<SEOSettingsFormInputs | null>(null);
  const { register, handleSubmit, setValue } = useForm<SEOSettingsFormInputs>();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Placeholder for fetching settings from API
        const response = {
          metaTitle: 'Grupo Naser CMS',
          metaDescription: 'El sistema de gestión de contenido para Grupo Naser.',
          googleAnalytics: 'UA-XXXXXXXX-X',
          searchConsole: 'SC-XXXXXXXXXXXXXX',
        };
        setSettings(response);
        setValue('metaTitle', response.metaTitle);
        setValue('metaDescription', response.metaDescription);
        setValue('googleAnalytics', response.googleAnalytics);
        setValue('searchConsole', response.searchConsole);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, [setValue]);

  const onSubmit = async (data: SEOSettingsFormInputs) => {
    try {
      // Placeholder for updating settings in API
      console.log('Updated settings:', data);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <div>
      <h2>Configuraciones SEO</h2>
      {settings && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='metaTitle'>Meta Title:</label>
            <input id='metaTitle' {...register('metaTitle')} required />{}
          </div>
          <div>
            <label htmlFor='metaDescription'>Meta Description:</label>
            <textarea id='metaDescription' {...register('metaDescription')} required />{}
          </div>
          <div>
            <label htmlFor='googleAnalytics'>Google Analytics ID:</label>
            <input id='googleAnalytics' {...register('googleAnalytics')} required />{}
          </div>
          <div>
            <label htmlFor='searchConsole'>Search Console ID:</label>
            <input id='searchConsole' {...register('searchConsole')} required />{}
          </div>
          <Button type='submit' className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>Guardar</Button>
        </form>
      )}
    </div>
  );
};

export default SEOSettings;
