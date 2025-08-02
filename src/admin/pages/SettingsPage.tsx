import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralSettings from '../../components/settings/GeneralSettings';
import SEOSettings from '../../components/settings/SEOSettings';
import EmailSettings from '../../components/settings/EmailSettings';
import BackupSettings from '../../components/settings/BackupSettings';
import SystemInfo from '../../components/settings/SystemInfo';
import Button from '@headlessui/react';

const SettingsPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'general' | 'seo' | 'email' | 'backup' | 'system'>('general');
  const navigate = useNavigate();

  const handleTabChange = (tab: 'general' | 'seo' | 'email' | 'backup' | 'system') => {
    setCurrentTab(tab);
  };

  return (
    <div>
      <h1>Configuraciones del Sistema</h1>
      <div className='flex mb-4'>
        <Button
          onClick={() => handleTabChange('general')}
          className={`mr-2 ${currentTab === 'general' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
          General
        </Button>
        <Button
          onClick={() => handleTabChange('seo')}
          className={`mr-2 ${currentTab === 'seo' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
          SEO
        </Button>
        <Button
          onClick={() => handleTabChange('email')}
          className={`mr-2 ${currentTab === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
          Email
        </Button>
        <Button
          onClick={() => handleTabChange('backup')}
          className={`mr-2 ${currentTab === 'backup' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
          Backup
        </Button>
        <Button
          onClick={() => handleTabChange('system')}
          className={`mr-2 ${currentTab === 'system' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
          Sistema
        </Button>
      </div>
      {currentTab === 'general' && <GeneralSettings />}
      {currentTab === 'seo' && <SEOSettings />}
      {currentTab === 'email' && <EmailSettings />}
      {currentTab === 'backup' && <BackupSettings />}
      {currentTab === 'system' && <SystemInfo />}
    </div>
  );
};

export default SettingsPage;
