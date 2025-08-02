import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MediaItem } from '../../../types/admin.types';
import { getMediaById, updateMedia } from '../../services/mediaService';
import { useForm } from 'react-hook-form';
import Button from '@headlessui/react';

interface MediaFormInputs {
  name: string;
  description: string;
  tags: string;
}

const MediaDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [media, setMedia] = useState<MediaItem | null>(null);
  const { register, handleSubmit, setValue } = useForm<MediaFormInputs>();

  useEffect(() => {
    if (id) {
      const fetchMedia = async () => {
        try {
          const response = await getMediaById(Number(id));
          setMedia(response.data);
          setValue('name', response.data.name);
          setValue('description', response.data.description);
          setValue('tags', response.data.tags.join(','));
        } catch (error) {
          console.error('Error fetching media item:', error);
        }
      };

      fetchMedia();
    }
  }, [id, setValue]);

  const onSubmit = async (data: MediaFormInputs) => {
    try {
      const updatedMedia = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()),
      };

      if (id) {
        await updateMedia(Number(id), updatedMedia);
      }
      navigate('/admin/media');
    } catch (error) {
      console.error('Error updating media item:', error);
    }
  };

  return (
    <div>
      <h1>Detalles del Medio</h1>
      {media && (
        <div>
          <img src={media.url} alt={media.name} className='max-w-full h-auto mb-4' />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor='name'>Nombre:</label>
              <input id='name' {...register('name')} required />{}
            </div>
            <div>
              <label htmlFor='description'>Descripción:</label>
              <textarea id='description' {...register('description')} required />{}
            </div>
            <div>
              <label htmlFor='tags'>Etiquetas (separadas por comas):</label>
              <input id='tags' {...register('tags')} required />{}
            </div>
            <Button type='submit' className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>Guardar</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MediaDetails;
