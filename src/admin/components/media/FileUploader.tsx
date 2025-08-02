import React from 'react';
import { useMutation } from 'react-query';
import { uploadMedia } from '../../services/adminApi';
import { toast } from 'react-toastify';
import { IoCloudUploadOutline } from 'react-icons/io5';

const FileUploader = ({ onUpload }: { onUpload: () => void }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const { mutateAsync: uploadMediaMutate, isLoading } = useMutation(uploadMedia);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);

      try {
        await uploadMediaMutate(formData);
        toast.success(`File ${files[i].name} uploaded successfully!`);
        onUpload();
      } catch (error: any) {
        toast.error(error.message || `Failed to upload file ${files[i].name}.`);
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Upload Files</label>
      <div className="flex items-center">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer"
        >
          <IoCloudUploadOutline className="mr-2" />
          Select Files
        </label>
        <button
          type="button"
          onClick={handleUpload}
          disabled={!files || isLoading}
          className={`px-4 py-2 bg-green-500 text-white font-bold rounded ml-2 ${!files || isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default FileUploader;