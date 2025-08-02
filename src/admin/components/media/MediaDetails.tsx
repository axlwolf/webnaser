import React from 'react';
import { Media } from '../../types/admin.types';
import { IoCloseCircle } from 'react-icons/io5';

interface Props {
  media: Media;
  onClose: () => void;
}

const MediaDetails = ({ media, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Media Details</h2>
        {media.type === 'image' && (
          <img src={media.url} alt={media.name} className="w-full h-48 object-cover rounded-lg" />
        )}
        {media.type === 'document' && (
          <iframe src={media.url} title={media.name} className="w-full h-48" />
        )}
        {media.type === 'video' && (
          <video src={media.url} controls className="w-full h-48" />
        )}
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">{media.name}</h3>
          <p className="text-gray-500 mb-2">Type: {media.type}</p>
          <p className="text-gray-500 mb-2">Folder: {media.folder}</p>
          <p className="text-gray-500 mb-2">Uploaded on {media.createdAt}</p>
          <div className="mt-4">
            <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">Tags</label>
            <input
              type="text"
              id="tags"
              value={media.tags.join(', ')}
              onChange={(e) => {} /* Handle tags change */}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            <IoCloseCircle className="mr-2" /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaDetails;