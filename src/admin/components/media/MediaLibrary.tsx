import React from 'react';
import { useQuery, useMutation } from 'react-query';
import { getMedias, deleteMedia } from '../../services/adminApi';
import { toast } from 'react-toastify';
import FileUploader from './FileUploader';
import MediaGrid from './MediaGrid';

const MediaLibrary = () => {
  const { data: medias, isLoading, refetch } = useQuery(['medias'], getMedias);
  const { mutateAsync: deleteMediaMutate, isLoading: isDeleting } = useMutation(deleteMedia);

  const handleDelete = async (id: number) => {
    try {
      await deleteMediaMutate(id);
      toast.success('Media deleted successfully!');
      refetch();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete media.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Media Library</h2>
      <FileUploader onUpload={refetch} />
      <MediaGrid medias={medias} onDelete={handleDelete} />
    </div>
  );
};

export default MediaLibrary;