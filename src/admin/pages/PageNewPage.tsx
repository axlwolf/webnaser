import React from 'react';
import PageEditor from '../../components/pages/PageEditor';

const PageNewPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Page</h1>
      <PageEditor />
    </div>
  );
};

export default PageNewPage;