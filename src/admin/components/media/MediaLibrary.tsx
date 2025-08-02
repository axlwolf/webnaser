import React from 'react';
import { MediaItem } from '../../../types/admin.types';
import Button from '@headlessui/react';

interface MediaLibraryProps {
  mediaItems: MediaItem[];
  onEdit: (id: number) => void;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({ mediaItems, onEdit }) => {
  return (
    <div className='grid grid-cols-1 gap-4'>
      {mediaItems.map((media) => (
        <div key={media.id} className='p-4 border rounded shadow'>
          <h2>{media.name}</h2>
          <p>{media.type}</p>
          <img src={media.url} alt={media.name} className='max-w-full h-auto' />
          <Button
            onClick={() => onEdit(media.id)}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Editar
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MediaLibrary;
