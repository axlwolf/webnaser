import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './admin/hooks/useAuth';
import AuthGuard from './admin/components/auth/AuthGuard';
import LoginPage from './admin/pages/LoginPage';
import DashboardPage from './admin/pages/DashboardPage';
import AdminLayout from './admin/components/layout/AdminLayout';
import PagesPage from './admin/pages/PagesPage';
import PageNewPage from './admin/pages/PageNewPage';
import PageEditPage from './admin/pages/PageEditPage';
import ServicesPage from './admin/pages/ServicesPage';
import ServiceNewPage from './admin/pages/ServiceNewPage';
import ServiceEditPage from './admin/pages/ServiceEditPage';
import LocationsPage from './admin/pages/LocationsPage';
import LocationNewPage from './admin/pages/LocationNewPage';
import LocationEditor from './admin/pages/LocationEditor';
import MediaPage from './admin/pages/MediaPage';
import FileUploader from './admin/components/media/FileUploader';
import MediaDetails from './admin/components/media/MediaDetails';
import UsersPage from './admin/pages/UsersPage';
import UserNewPage from './admin/pages/UserNewPage';
import UserEditor from './admin/pages/UserEditor';
import UserActivity from './admin/pages/UserActivity';
import GeneralSettings from './admin/components/settings/GeneralSettings';
import SEOSettings from './admin/components/settings/SEOSettings';
import EmailSettings from './admin/components/settings/EmailSettings';
import BackupSettings from './admin/components/settings/BackupSettings';
import SystemInfo from './admin/components/settings/SystemInfo';
import SettingsPage from './admin/pages/SettingsPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AuthGuard />} path="/dashboard" element={<AdminLayout><DashboardPage /></AdminLayout>} />
          <Route path="/pages" element={<AdminLayout><PagesPage /></AdminLayout>} />
          <Route path="/pages/new" element={<AdminLayout><PageNewPage /></AdminLayout>} />
          <Route path="/pages/:id/edit" element={<AdminLayout><PageEditPage /></AdminLayout>} />
          <Route path="/services" element={<AdminLayout><ServicesPage /></AdminLayout>} />
          <Route path="/services/new" element={<AdminLayout><ServiceNewPage /></AdminLayout>} />
          <Route path="/services/:id/edit" element={<AdminLayout><ServiceEditPage /></AdminLayout>} />
          <Route path="/locations" element={<AdminLayout><LocationsPage /></AdminLayout>} />
          <Route path="/locations/new" element={<AdminLayout><LocationNewPage /></AdminLayout>} />
          <Route path="/locations/:id/edit" element={<AdminLayout><LocationEditor /></AdminLayout>} />
          <Route path="/media" element={<AdminLayout><MediaPage /></AdminLayout>} />
          <Route path="/media/upload" element={<AdminLayout><FileUploader /></AdminLayout>} />
          <Route path="/media/:id/edit" element={<AdminLayout><MediaDetails /></AdminLayout>} />
          <Route path="/users" element={<AdminLayout><UsersPage /></AdminLayout>} />
          <Route path="/users/new" element={<AdminLayout><UserNewPage /></AdminLayout>} />
          <Route path="/users/:id/edit" element={<AdminLayout><UserEditor /></AdminLayout>} />
          <Route path="/users/:id/activity" element={<AdminLayout><UserActivity userId={parseInt(useParams<{ id?: string }>().id || '0')} /></AdminLayout>} />
          <Route path="/settings/general" element={<AdminLayout><GeneralSettings /></AdminLayout>} />
          <Route path="/settings/seo" element={<AdminLayout><SEOSettings /></AdminLayout>} />
          <Route path="/settings/email" element={<AdminLayout><EmailSettings /></AdminLayout>} />
          <Route path="/settings/backup" element={<AdminLayout><BackupSettings /></AdminLayout>} />
          <Route path="/settings/system" element={<AdminLayout><SystemInfo /></AdminLayout>} />
          <Route path="/settings" element={<AdminLayout><SettingsPage /></AdminLayout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;