import React from 'react';
import ServiceEditor from '../../components/services/ServiceEditor';

const ServiceNewPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Service</h1>
      <ServiceEditor />
    </div>
  );
};

export default ServiceNewPage;