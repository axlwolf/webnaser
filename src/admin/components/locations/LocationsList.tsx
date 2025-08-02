import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getLocations } from '../../services/adminApi';

interface Location {
  id: number;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: Record<string, string>;
  services: string[];
  images: string[];
  isMain: boolean;
  status: 'active' | 'inactive';
}

const LocationsList = () => {
  const { data: locations, isLoading, refetch } = useQuery(['locations'], getLocations);

  const handleDelete = async (id: number) => {
    try {
      await deleteLocation(id);
      toast.success('Location deleted successfully!');
      refetch();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete location.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Locations List</h2>
      <Link to="/locations/new" className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4">
        Create New Location
      </Link>
      <ul className="space-y-2">
        {locations.map((location: Location) => (
          <li key={location.id} className="flex justify-between">
            <span className="text-gray-700">{location.name}</span>
            <span className={`text-sm ${location.status === 'active' ? 'text-green-500' : 'text-gray-500'}`}>{location.status}</span>
            <div className="flex space-x-2">
              <Link to={`/locations/${location.id}/edit`} className="text-blue-500 font-bold">Edit</Link>
              <button
                onClick={() => handleDelete(location.id)}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationsList;