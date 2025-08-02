import React from 'react';
import { useQuery } from 'react-query';
import { getUserActivity } from '../../services/adminApi';
import { IoCloseCircle } from 'react-icons/io5';

interface UserActivity {
  id: number;
  userId: number;
  activity: string;
  timestamp: string;
}

interface Props {
  userId: number;
  onClose: () => void;
}

const UserActivity = ({ userId, onClose }: Props) => {
  const { data: activities, isLoading } = useQuery(['userActivity', userId], () => getUserActivity(userId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">User Activity</h2>
        <ul className="space-y-2">
          {activities.map((activity: UserActivity) => (
            <li key={activity.id} className="text-gray-700">
              {activity.activity} on {activity.timestamp}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          <IoCloseCircle className="mr-2" /> Close
        </button>
      </div>
    </div>
  );
};

export default UserActivity;