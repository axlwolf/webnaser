import React from 'react';
import { Media } from '../../types/admin.types';
import { IoTrashBin } from 'react-icons/io5';

interface Props {
  medias: Media[];
  onDelete: (id: number) => void;
}

const MediaGrid = ({ medias, onDelete }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {medias.map((media) => (
        <div key={media.id} className="bg-white p-4 rounded-lg shadow-md relative">
          {media.type === 'image' && (
            <img src={media.url} alt={media.name} className="w-full h-48 object-cover rounded-lg" />
          )}
          {media.type === 'document' && (
            <iframe src={media.url} title={media.name} className="w-full h-48" />
          )}
          {media.type === 'video' && (
            <video src={media.url} controls className="w-full h-48" />
          )}
          <div className="mt-2">
            <h3 className="text-lg font-bold mb-2">{media.name}</h3>
            <p className="text-gray-500 mb-2">{media.type}</p>
            <p className="text-gray-500 mb-2">Folder: {media.folder}</p>
            <p className="text-gray-500 mb-2">Uploaded on {media.createdAt}</p>
            <button
              type="button"
              onClick={() => onDelete(media.id)}
              className="bg-red-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
            >
              <IoTrashBin className="mr-2" /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;