import React from 'react';
import { Line } from 'react-chartjs-2';
import { DashboardStats } from '../../types/admin.types';

interface Props {
  metrics: DashboardStats;
}

const MetricsChart = ({ metrics }: Props) => {
  const data = {
    labels: Object.keys(metrics.services.byCategory),
    datasets: [
      {
        label: 'Services by Category',
        data: Object.values(metrics.services.byCategory),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Services by Category',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Metrics Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default MetricsChart;