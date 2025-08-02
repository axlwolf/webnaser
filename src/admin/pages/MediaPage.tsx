import React from 'react';
import MediaLibrary from '../../components/media/MediaLibrary';

const MediaPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Media Management</h1>
      <MediaLibrary />
    </div>
  );
};

export default MediaPage;