import React from 'react';
import { Tab } from '@headlessui/react';
import GeneralSettings from '../../components/settings/GeneralSettings';
import SEOSettings from '../../components/settings/SEOSettings';
import EmailSettings from '../../components/settings/EmailSettings';
import BackupSettings from '../../components/settings/BackupSettings';
import SystemInfo from '../../components/settings/SystemInfo';

const SettingsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">System Settings</h1>
      <Tab.Group>
        <Tab.List className="flex space-x-1 bg-blue-100 rounded-lg p-1">
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-100 ring-blue-500 transition duration-150 ease-in-out ${selected ? 'bg-white shadow' : ''}`
            }
          >
            General
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-100 ring-blue-500 transition duration-150 ease-in-out ${selected ? 'bg-white shadow' : ''}`
            }
          >
            SEO
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-100 ring-blue-500 transition duration-150 ease-in-out ${selected ? 'bg-white shadow' : ''}`
            }
          >
            Email
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-100 ring-blue-500 transition duration-150 ease-in-out ${selected ? 'bg-white shadow' : ''}`
            }
          >
            Backup
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-100 ring-blue-500 transition duration-150 ease-in-out ${selected ? 'bg-white shadow' : ''}`
            }
          >
            System Info
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <GeneralSettings />
          </Tab.Panel>
          <Tab.Panel>
            <SEOSettings />
          </Tab.Panel>
          <Tab.Panel>
            <EmailSettings />
          </Tab.Panel>
          <Tab.Panel>
            <BackupSettings />
          </Tab.Panel>
          <Tab.Panel>
            <SystemInfo />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SettingsPage;