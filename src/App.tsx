import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './admin/hooks/useAuth';
import AuthGuard from './admin/components/auth/AuthGuard';
import LoginPage from './admin/pages/LoginPage';
import DashboardPage from './admin/pages/DashboardPage';
import AdminLayout from './admin/components/layout/AdminLayout';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AuthGuard />}
            path="/dashboard" element={<AdminLayout><DashboardPage /></AdminLayout>} />
          {<Route path="/pages" element={<AdminLayout><PagesPage /></AdminLayout>} />
<Route path="/pages/new" element={<AdminLayout><PageNewPage /></AdminLayout>} />
<Route path="/pages/:id/edit" element={<AdminLayout><PageEditPage /></AdminLayout>} />
<Route path="/services" element={<AdminLayout><ServicesPage /></AdminLayout>} />
<Route path="/services/new" element={<AdminLayout><ServiceNewPage /></AdminLayout>} />
<Route path="/services/:id/edit" element={<AdminLayout><ServiceEditPage /></AdminLayout>} />
<Route path="/locations" element={<AdminLayout><LocationsPage /></AdminLayout>} />
<Route path="/locations/new" element={<AdminLayout><LocationNewPage /></AdminLayout>} />
<Route path="/locations/:id/edit" element={<AdminLayout><LocationEditPage /></AdminLayout>} />
<Route path="/locations" element={<AdminLayout><LocationsPage /></AdminLayout>} />
<Route path="/locations/new" element={<AdminLayout><LocationNewPage /></AdminLayout>} />
<Route path="/locations/:id/edit" element={<AdminLayout><LocationEditPage /></AdminLayout>} />
<Route path="/media" element={<AdminLayout><MediaPage /></AdminLayout>} />
<Route path="/settings/general" element={<AdminLayout><GeneralSettings /></AdminLayout>} />
<Route path="/settings/seo" element={<AdminLayout><SEOSettings /></AdminLayout>} />
<Route path="/settings/email" element={<AdminLayout><EmailSettings /></AdminLayout>} />
<Route path="/settings/backup" element={<AdminLayout><BackupSettings /></AdminLayout>} />
<Route path="/settings/system" element={<AdminLayout><SystemInfo /></AdminLayout>} />
<Route path="/settings/general" element={<AdminLayout><GeneralSettings /></AdminLayout>} />
<Route path="/settings/seo" element={<AdminLayout><SEOSettings /></AdminLayout>} />
<Route path="/settings/email" element={<AdminLayout><EmailSettings /></AdminLayout>} />
<Route path="/settings/backup" element={<AdminLayout><BackupSettings /></AdminLayout>} />
<Route path="/settings/system" element={<AdminLayout><SystemInfo /></AdminLayout>} />
<Route path="/settings" element={<AdminLayout><SettingsPage /></AdminLayout>} />
<Route path="/settings/general" element={<AdminLayout><GeneralSettings /></AdminLayout>} />
<Route path="/settings/seo" element={<AdminLayout><SEOSettings /></AdminLayout>} />
<Route path="/settings/email" element={<AdminLayout><EmailSettings /></AdminLayout>} />
<Route path="/settings/backup" element={<AdminLayout><BackupSettings /></AdminLayout>} />
<Route path="/settings/system" element={<AdminLayout><SystemInfo /></AdminLayout>} />
<Route path="/media" element={<AdminLayout><MediaPage /></AdminLayout>} />
<Route path="/users" element={<AdminLayout><UsersPage /></AdminLayout>} />
<Route path="/users/new" element={<AdminLayout><UserNewPage /></AdminLayout>} />
<Route path="/users/:id/edit" element={<AdminLayout><UserEditPage /></AdminLayout>} />
<Route path="/settings/general" element={<AdminLayout><GeneralSettings /></AdminLayout>} />
<Route path="/settings/seo" element={<AdminLayout><SEOSettings /></AdminLayout>} />
<Route path="/settings/email" element={<AdminLayout><EmailSettings /></AdminLayout>} />
<Route path="/settings/backup" element={<AdminLayout><BackupSettings /></AdminLayout>} />
<Route path="/settings/system" element={<AdminLayout><SystemInfo /></AdminLayout>} />
<Route path="/users" element={<AdminLayout><UsersPage /></AdminLayout>} />
<Route path="/users/new" element={<AdminLayout><UserNewPage /></AdminLayout>} />
<Route path="/users/:id/edit" element={<AdminLayout><UserEditPage /></AdminLayout>} />
<Route path="/settings/general" element={<AdminLayout><GeneralSettings /></AdminLayout>} />
<Route path="/settings/seo" element={<AdminLayout><SEOSettings /></AdminLayout>} />
<Route path="/settings/email" element={<AdminLayout><EmailSettings /></AdminLayout>} />
<Route path="/settings/backup" element={<AdminLayout><BackupSettings /></AdminLayout>} />
<Route path="/settings/system" element={<AdminLayout><SystemInfo /></AdminLayout>} />
<Route path="/users" element={<AdminLayout><UsersPage /></AdminLayout>} />
<Route path="/users/new" element={<AdminLayout><UserNewPage /></AdminLayout>} />
<Route path="/users/:id/edit" element={<AdminLayout><UserEditPage /></AdminLayout>} />
<Route path="/users/:id/activity" element={<AdminLayout><UserActivity userId={parseInt(useParams<{ id?: string }>().id || '0')} /></AdminLayout>} />
<Route path="/settings/general" element={<AdminLayout><GeneralSettings /></AdminLayout>} />
<Route path="/settings/seo" element={<AdminLayout><SEOSettings /></AdminLayout>} />
<Route path="/settings/email" element={<AdminLayout><EmailSettings /></AdminLayout>} />
<Route path="/settings/backup" element={<AdminLayout><BackupSettings /></AdminLayout>} />
<Route path="/settings/system" element={<AdminLayout><SystemInfo /></AdminLayout>} />
<Route path="/settings/general" element={<AdminLayout><GeneralSettings /></AdminLayout>} />
<Route path="/settings/seo" element={<AdminLayout><SEOSettings /></AdminLayout>} />
<Route path="/settings/email" element={<AdminLayout><EmailSettings /></AdminLayout>} />
<Route path="/settings/backup" element={<AdminLayout><BackupSettings /></AdminLayout>} />
<Route path="/settings/system" element={<AdminLayout><SystemInfo /></AdminLayout>} />
<Route path="/settings" element={<AdminLayout><SettingsPage /></AdminLayout>} />
<Route path="/settings" element={<AdminLayout><SettingsPage /></AdminLayout>} />
/* Add other protected routes here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;