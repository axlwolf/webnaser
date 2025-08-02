import React from 'react';
import PageEditor from '../../components/pages/PageEditor';

const PageEditPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Page</h1>
      <PageEditor />
    </div>
  );
};

export default PageEditPage;