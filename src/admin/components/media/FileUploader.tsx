import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMedia } from '../../services/mediaService';
import Button from '@headlessui/react';

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await createMedia(formData);
      alert('Archivo subido exitosamente');
      navigate('/admin/media');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error al subir el archivo');
    }
  };

  return (
    <div>
      <h2>Subir Archivo</h2>
      <input type='file' onChange={handleFileChange} accept='image/*,application/pdf' />
      <Button onClick={handleUpload} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>Subir</Button>
    </div>
  );
};

export default FileUploader;
