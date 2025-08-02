import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MediaLibrary from '../../components/media/MediaLibrary';
import { MediaItem } from '../../types/admin.types';
import { getAllMedia } from '../../services/mediaService';

const MediaPage: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await getAllMedia();
        setMediaItems(response.data);
      } catch (error) {
        console.error('Error fetching media items:', error);
      }
    };

    fetchMedia();
  }, []);

  const handleEditMedia = (id: number) => {
    navigate(`/admin/media/${id}/edit`);
  };

  return (
    <div>
      <h1>Sistema de Medios y Archivos</h1>
      <MediaGrid mediaItems={mediaItems} onEdit={handleEditMedia} />
    </div>
  );
};

export default MediaPage;
