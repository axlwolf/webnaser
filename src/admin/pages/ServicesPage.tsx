import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import ServicesList from '../../components/services/ServicesList';
import { toast } from 'react-toastify';
import { deleteService } from '../../services/adminApi';

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

const ServicesPage = () => {
  const { data: services, isLoading, refetch } = useQuery(['services'], getServices);

  const handleDelete = async (id: number) => {
    try {
      await deleteService(id);
      toast.success('Service deleted successfully!');
      refetch();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete service.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Services Management</h1>
      <Link to="/services/new" className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4">
        Create New Service
      </Link>
      <ul className="space-y-2">
        {services.map((service: Service) => (
          <li key={service.id} className="flex justify-between">
            <span className="text-gray-700">{service.name}</span>
            <span className={`text-sm ${service.status === 'active' ? 'text-green-500' : 'text-gray-500'}`}>{service.status}</span>
            <div className="flex space-x-2">
              <Link to={`/services/${service.id}/edit`} className="text-blue-500 font-bold">Edit</Link>
              <button
                onClick={() => handleDelete(service.id)}
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

export default ServicesPage;