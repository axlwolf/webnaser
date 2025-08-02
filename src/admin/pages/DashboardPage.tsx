import React from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../hooks/useAuth';
import { getDashboardStats } from '../../services/adminApi';
import StatsCards from '../../components/dashboard/StatsCards';
import RecentActivity from '../../components/dashboard/RecentActivity';
import QuickActions from '../../components/dashboard/QuickActions';
import SystemStatus from '../../components/dashboard/SystemStatus';
import MetricsChart from '../../components/dashboard/MetricsChart';

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery(['dashboardStats'], getDashboardStats);

  if (loading || statsLoading) {
    return <div className="flex justify-center items-center h-screen bg-gray-100"><LoadingSpinner /></div>;
  }

  if (statsError) {
    return <div className="text-red-500 text-center p-6">Failed to load dashboard stats.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCards stats={stats} />
        <RecentActivity activities={stats.pages.recent} />
        <QuickActions />
        <SystemStatus status={stats.system} />
        <MetricsChart metrics={stats} />
      </div>
    </div>
  );
};

export default DashboardPage;