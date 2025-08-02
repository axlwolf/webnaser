import React from 'react';
import { Location } from '../../types/admin.types';

interface Props {
  hours: Record<string, string>;
  onChange: (hours: Record<string, string>) => void;
}

const HoursManager = ({ hours, onChange }: Props) => {
  const handleChange = (day: string, value: string) => {
    onChange({ ...hours, [day]: value });
  };

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Hours Manager</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <div key={day}>
            <label htmlFor={`${day}-hours`} className="block text-gray-700 font-bold mb-2">{day}</label>
            <input
              type="text"
              id={`${day}-hours`}
              value={hours[day.toLowerCase()] || ''}
              onChange={(e) => handleChange(day.toLowerCase(), e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoursManager;