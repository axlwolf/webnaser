import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Location } from '../../../types/admin.types';
import { getLocationById, updateLocation } from '../../services/locationService';
import { useForm } from 'react-hook-form';
import Button from '@headlessui/react';

interface LocationFormInputs {
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  coordinatesLat: number;
  coordinatesLng: number;
  hours: string;
  services: string;
  images: string;
  isMain: boolean;
  status: string;
}

const LocationEditor: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [location, setLocation] = useState<Location | null>(null);
  const { register, handleSubmit, setValue } = useForm<LocationFormInputs>();

  useEffect(() => {
    if (id) {
      const fetchLocation = async () => {
        try {
          const response = await getLocationById(Number(id));
          setLocation(response.data);
          setValue('name', response.data.name);
          setValue('slug', response.data.slug);
          setValue('address', response.data.address);
          setValue('phone', response.data.phone);
          setValue('email', response.data.email);
          setValue('coordinatesLat', response.data.coordinates.lat);
          setValue('coordinatesLng', response.data.coordinates.lng);
          setValue('hours', JSON.stringify(response.data.hours));
          setValue('services', response.data.services.join(','));
          setValue('images', response.data.images.join(','));
          setValue('isMain', response.data.isMain);
          setValue('status', response.data.status);
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      };

      fetchLocation();
    }
  }, [id, setValue]);

  const onSubmit = async (data: LocationFormInputs) => {
    try {
      const updatedLocation = {
        ...data,
        coordinates: {
          lat: Number(data.coordinatesLat),
          lng: Number(data.coordinatesLng),
        },
        services: data.services.split(',').map(service => service.trim()),
        images: data.images.split(',').map(image => image.trim()),
      };

      if (id) {
        await updateLocation(Number(id), updatedLocation);
      }
      navigate('/admin/locations');
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  return (
    <div>
      <h1>Editar Ubicación</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='name'>Nombre:</label>
          <input id='name' {...register('name')} required />{}
        </div>
        <div>
          <label htmlFor='slug'>Slug:</label>
          <input id='slug' {...register('slug')} required />{}
        </div>
        <div>
          <label htmlFor='address'>Dirección:</label>
          <input id='address' {...register('address')} required />{}
        </div>
        <div>
          <label htmlFor='phone'>Teléfono:</label>
          <input id='phone' {...register('phone')} required />{}
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input id='email' {...register('email')} required />{}
        </div>
        <div>
          <label htmlFor='coordinatesLat'>Latitud:</label>
          <input id='coordinatesLat' type='number' {...register('coordinatesLat')} required />{}
        </div>
        <div>
          <label htmlFor='coordinatesLng'>Longitud:</label>
          <input id='coordinatesLng' type='number' {...register('coordinatesLng')} required />{}
        </div>
        <div>
          <label htmlFor='hours'>Horarios (JSON):</label>
          <textarea id='hours' {...register('hours')} required />{}
        </div>
        <div>
          <label htmlFor='services'>Servicios (separados por comas):</label>
          <input id='services' {...register('services')} required />{}
        </div>
        <div>
          <label htmlFor='images'>Imágenes (URLs separadas por comas):</label>
          <input id='images' {...register('images')} required />{}
        </div>
        <div>
          <label htmlFor='isMain'>Principal:</label>
          <input id='isMain' type='checkbox' {...register('isMain')} />{}
        </div>
        <div>
          <label htmlFor='status'>Estado:</label>
          <select id='status' {...register('status')} required >{}
            <option value='active'>Activo</option>
            <option value='inactive'>Inactivo</option>
          </select>
        </div>
        <Button type='submit' className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>Guardar</Button>
      </form>
    </div>
  );
};

export default LocationEditor;
