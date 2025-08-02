import React from 'react';
import ServiceEditor from '../../components/services/ServiceEditor';

const ServiceEditPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Service</h1>
      <ServiceEditor />
    </div>
  );
};

export default ServiceEditPage;