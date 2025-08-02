import React from 'react';
import { MediaItem } from '../../../types/admin.types';
import Button from '@headlessui/react';

interface MediaGridProps {
  mediaItems: MediaItem[];
  onEdit: (id: number) => void;
}

const MediaGrid: React.FC<MediaGridProps> = ({ mediaItems, onEdit }) => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {mediaItems.map((media) => (
        <div key={media.id} className='p-4 border rounded shadow'>
          <img src={media.url} alt={media.name} className='max-w-full h-auto' />
          <h2>{media.name}</h2>
          <p>{media.type}</p>
          <Button
            onClick={() => onEdit(media.id)}
            className='bg-blue-500 text-white px-4 py-2 rounded mt-2'
          >
            Editar
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
