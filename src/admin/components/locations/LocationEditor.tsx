import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { getLocation, updateLocation, createLocation } from '../../services/adminApi';
import HoursManager from './HoursManager';
import ServicesAssignment from './ServicesAssignment';
import ServiceGallery from '../services/ServiceGallery';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Location {
  id?: number;
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

const LocationEditor = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [location, setLocation] = useState<Location>({ name: '', slug: '', address: '', phone: '', email: '', coordinates: { lat: 0, lng: 0 }, hours: {}, services: [], images: [], isMain: false, status: 'active' });

  const { data: existingLocation, isLoading } = useQuery(['location', id], () => getLocation(Number(id)), { enabled: !!id });
  const { mutateAsync: updateLocationMutate, isLoading: isUpdating } = useMutation(updateLocation);
  const { mutateAsync: createLocationMutate, isLoading: isCreating } = useMutation(createLocation);

  useEffect(() => {
    if (existingLocation) {
      setLocation(existingLocation);
    }
  }, [existingLocation]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocation({ ...location, [event.target.name]: event.target.value });
  };

  const handleCoordinatesChange = (coordinates: { lat: number; lng: number }) => {
    setLocation({ ...location, coordinates });
  };

  const handleHoursChange = (hours: Record<string, string>) => {
    setLocation({ ...location, hours });
  };

  const handleServicesChange = (services: string[]) => {
    setLocation({ ...location, services });
  };

  const handleImagesChange = (images: string[]) => {
    setLocation({ ...location, images });
  };

  const handleIsMainChange = (isMain: boolean) => {
    setLocation({ ...location, isMain });
  };

  const handleStatusChange = (status: 'active' | 'inactive') => {
    setLocation({ ...location, status });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (id) {
        await updateLocationMutate({ ...location, id: Number(id) });
        toast.success('Location updated successfully!');
      } else {
        await createLocationMutate(location);
        toast.success('Location created successfully!');
        navigate('/locations');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to save location.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit Location' : 'Create New Location'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={location.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="slug" className="block text-gray-700 font-bold mb-2">Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={location.slug}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
          <textarea
            id="address"
            name="address"
            value={location.address}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={location.phone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={location.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Coordinates</label>
          <div className="flex space-x-2">
            <input
              type="number"
              step="any"
              name="lat"
              value={location.coordinates.lat}
              onChange={(e) => handleCoordinatesChange({ ...location.coordinates, lat: parseFloat(e.target.value) })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="number"
              step="any"
              name="lng"
              value={location.coordinates.lng}
              onChange={(e) => handleCoordinatesChange({ ...location.coordinates, lng: parseFloat(e.target.value) })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <HoursManager
          hours={location.hours}
          onChange={handleHoursChange}
        />
        <ServicesAssignment
          services={location.services}
          onChange={handleServicesChange}
        />
        <ServiceGallery
          image={location.images[0] || ''}
          gallery={location.images.slice(1)}
          onImageChange={(image) => handleImagesChange([image, ...location.images.slice(1)])}
          onGalleryChange={(gallery) => handleImagesChange([location.images[0], ...gallery])}
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={location.isMain}
              onChange={(e) => handleIsMainChange(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Main Location</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="status"
              value="active"
              checked={location.status === 'active'}
              onChange={() => handleStatusChange('active')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Active</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={location.status === 'inactive'}
              onChange={() => handleStatusChange('inactive')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
        <button
          type="submit"
          disabled={isUpdating || isCreating}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isUpdating || isCreating ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {isUpdating || isCreating ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default LocationEditor;