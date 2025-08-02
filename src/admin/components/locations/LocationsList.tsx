import React from 'react';
import { Location } from '../../../types/admin.types';
import Button from '@headlessui/react';

interface LocationsListProps {
  locations: Location[];
  onEdit: (id: number) => void;
}

const LocationsList: React.FC<LocationsListProps> = ({ locations, onEdit }) => {
  return (
    <div className='grid grid-cols-1 gap-4'>
      {locations.map((location) => (
        <div key={location.id} className='p-4 border rounded shadow'>
          <h2>{location.name}</h2>
          <p>{location.address}</p>
          <Button
            onClick={() => onEdit(location.id)}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Editar
          </Button>
        </div>
      ))}
    </div>
  );
};

export default LocationsList;
