import React from 'react';
import PagesList from '../../components/pages/PagesList';

const PagesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Pages Management</h1>
      <PagesList />
    </div>
  );
};

export default PagesPage;