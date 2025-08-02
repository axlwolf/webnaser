import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  image: string;
  gallery: string[];
  onImageChange: (image: string) => void;
  onGalleryChange: (gallery: string[]) => void;
}

const ServiceGallery = ({ image, gallery, onImageChange, onGalleryChange }: Props) => {
  const [imageUrl, setImageUrl] = useState(image);
  const [galleryUrls, setGalleryUrls] = useState(gallery);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageUrl(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newGalleryUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          newGalleryUrls.push(result);
          if (i === files.length - 1) {
            setGalleryUrls(newGalleryUrls);
            onGalleryChange(newGalleryUrls);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    onImageChange('');
  };

  const handleRemoveGalleryImage = (index: number) => {
    const newGalleryUrls = galleryUrls.filter((_, i) => i !== index);
    setGalleryUrls(newGalleryUrls);
    onGalleryChange(newGalleryUrls);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {imageUrl && (
        <div className="mt-2">
          <img src={imageUrl} alt="Service" className="max-w-full h-auto" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Remove Image
          </button>
        </div>
      )}
      <label className="block text-gray-700 font-bold mb-2 mt-4">Gallery</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleGalleryChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {galleryUrls.length > 0 && (
        <div className="mt-2">
          {galleryUrls.map((url, index) => (
            <div key={index} className="inline-block mr-2">
              <img src={url} alt={`Gallery ${index + 1}`} className="max-w-full h-auto" />
              <button
                type="button"
                onClick={() => handleRemoveGalleryImage(index)}
                className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceGallery;