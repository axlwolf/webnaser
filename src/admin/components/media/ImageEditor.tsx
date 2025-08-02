import React from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from 'react-easy-crop';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { updateMedia } from '../../services/adminApi';

interface Props {
  media: { id: number; url: string };
  onClose: () => void;
}

const ImageEditor = ({ media, onClose }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
  const { mutateAsync: updateMediaMutate, isLoading } = useMutation(updateMedia);

  const onCropComplete = (croppedArea: CroppedArea, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(media.url, croppedAreaPixels);
      const formData = new FormData();
      formData.append('file', croppedImage);

      await updateMediaMutate({ ...media, file: formData });
      toast.success('Image edited successfully!');
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to edit image.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Edit Image</h2>
        <Cropper
          image={media.url}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <div className="mt-4">
          <button
            type="button"
            onClick={handleCrop}
            disabled={isLoading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {isLoading ? 'Editing...' : 'Edit Image'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;