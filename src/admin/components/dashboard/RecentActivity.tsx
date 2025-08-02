import React from 'react';
import { Page } from '../../types/admin.types';

interface Props {
  activities: Page[];
}

const RecentActivity = ({ activities }: Props) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <ul className="space-y-2">
        {activities.map((activity) => (
          <li key={activity.id} className="text-gray-700">
            <span className="font-semibold">{activity.title}</span> was updated on {activity.updatedAt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;