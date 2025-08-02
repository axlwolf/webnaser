import React from 'react';
import LocationEditor from '../../components/locations/LocationEditor';

const LocationEditPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Location</h1>
      <LocationEditor />
    </div>
  );
};

export default LocationEditPage;