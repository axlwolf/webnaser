import React from 'react';
import { Location } from '../../types/admin.types';

interface Props {
  services: string[];
  onChange: (services: string[]) => void;
}

const ServicesAssignment = ({ services, onChange }: Props) => {
  const [allServices, setAllServices] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/content/services');
        setAllServices(response.data.map((service: any) => service.id));
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceChange = (serviceId: string) => {
    if (services.includes(serviceId)) {
      onChange(services.filter((id) => id !== serviceId));
    } else {
      onChange([...services, serviceId]);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Services Assignment</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allServices.map((serviceId) => (
          <div key={serviceId} className="flex items-center">
            <input
              type="checkbox"
              id={`service-${serviceId}`}
              checked={services.includes(serviceId)}
              onChange={(e) => handleServiceChange(serviceId)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor={`service-${serviceId}`} className="ml-2">
              Service {serviceId}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesAssignment;