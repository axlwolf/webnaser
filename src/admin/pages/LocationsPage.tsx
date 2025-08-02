import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationsList from '../../components/locations/LocationsList';
import { Location } from '../../types/admin.types';
import { getAllLocations } from '../../services/locationService';

const LocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getAllLocations();
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleEditLocation = (id: number) => {
    navigate(`/admin/locations/${id}/edit`);
  };

  return (
    <div>
      <h1>Gestión de Ubicaciones</h1>
      <LocationsList locations={locations} onEdit={handleEditLocation} />
    </div>
  );
};

export default LocationsPage;
