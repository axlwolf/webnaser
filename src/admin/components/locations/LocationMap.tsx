import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { Location } from '../../types/admin.types';

interface Props {
  location: Location;
  onCoordinatesChange: (coordinates: { lat: number; lng: number }) => void;
}

const LocationMap = ({ location, onCoordinatesChange }: Props) => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const defaultCenter = {
    lat: location.coordinates.lat || 19.4326,
    lng: location.coordinates.lng || -99.1332,
  };

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent & { latLng: google.maps.LatLng }) => {
    const newCoordinates = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    onCoordinatesChange(newCoordinates);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
        onClick={(props) => {
          const newCoordinates = {
            lat: props.latLng.lat(),
            lng: props.latLng.lng(),
          };
          onCoordinatesChange(newCoordinates);
        }}
      >
        <Marker
          position={defaultCenter}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationMap;