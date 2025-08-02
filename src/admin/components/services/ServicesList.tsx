import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getServices } from '../../services/adminApi';

interface Service {
  id: number;
  name: string;
  category: 'prevision' | 'inmediata' | 'cremacion' | 'traslados' | 'velacion';
  description: string;
  features: string[];
  priceRange: string;
  image: string;
  gallery: string[];
  isFeatured: boolean;
  status: 'active' | 'inactive';
  locations: string[];
}

const ServicesList = () => {
  const { data: services, isLoading, error } = useQuery(['services'], getServices);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading services</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Services List</h2>
      <Link to="/services/new" className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4">
        Create New Service
      </Link>
      <ul className="space-y-2">
        {services.map((service: Service) => (
          <li key={service.id} className="flex justify-between">
            <span className="text-gray-700">{service.name}</span>
            <span className={`text-sm ${service.status === 'active' ? 'text-green-500' : 'text-gray-500'}`}>{service.status}</span>
            <Link to={`/services/${service.id}/edit`} className="text-blue-500 font-bold">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList;