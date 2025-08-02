import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@headlessui/react';

interface GeneralSettingsFormInputs {
  siteName: string;
  logoUrl: string;
  contactInfo: string;
}

const GeneralSettings: React.FC = () => {
  const [settings, setSettings] = useState<GeneralSettingsFormInputs | null>(null);
  const { register, handleSubmit, setValue } = useForm<GeneralSettingsFormInputs>();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Placeholder for fetching settings from API
        const response = {
          siteName: 'Grupo Naser CMS',
          logoUrl: 'https://example.com/logo.png',
          contactInfo: 'contact@gruponaser.com',
        };
        setSettings(response);
        setValue('siteName', response.siteName);
        setValue('logoUrl', response.logoUrl);
        setValue('contactInfo', response.contactInfo);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, [setValue]);

  const onSubmit = async (data: GeneralSettingsFormInputs) => {
    try {
      // Placeholder for updating settings in API
      console.log('Updated settings:', data);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <div>
      <h2>Configuraciones Generales</h2>
      {settings && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='siteName'>Nombre del Sitio:</label>
            <input id='siteName' {...register('siteName')} required />{}
          </div>
          <div>
            <label htmlFor='logoUrl'>URL del Logo:</label>
            <input id='logoUrl' {...register('logoUrl')} required />{}
          </div>
          <div>
            <label htmlFor='contactInfo'>Información de Contacto:</label>
            <input id='contactInfo' {...register('contactInfo')} required />{}
          </div>
          <Button type='submit' className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>Guardar</Button>
        </form>
      )}
    </div>
  );
};

export default GeneralSettings;
