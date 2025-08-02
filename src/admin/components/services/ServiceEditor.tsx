import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useQuery, useMutation } from 'react-query';
import { getService, updateService, createService } from '../../services/adminApi';
import ServiceCategories from './ServiceCategories';
import PricingManager from './PricingManager';
import ServiceGallery from './ServiceGallery';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Service {
  id?: number;
  name: string;
  category: 'prevision' | 'inmediata' | 'cremacion' | 'traslados' | 'velacion';
  description: string;
  features: string[];
  priceRange: string;
  image: string;
  gallery: string[];
  isFeatured: boolean;
  status: 'active' | 'inactive';
  locations: string[];
}

const ServiceEditor = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service>({ name: '', category: 'prevision', description: '', features: [], priceRange: '', image: '', gallery: [], isFeatured: false, status: 'active', locations: [] });

  const { data: existingService, isLoading } = useQuery(['service', id], () => getService(Number(id)), { enabled: !!id });
  const { mutateAsync: updateServiceMutate, isLoading: isUpdating } = useMutation(updateService);
  const { mutateAsync: createServiceMutate, isLoading: isCreating } = useMutation(createService);

  useEffect(() => {
    if (existingService) {
      setService(existingService);
    }
  }, [existingService]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setService({ ...service, [event.target.name]: event.target.value });
  };

  const handleFeaturesChange = (features: string[]) => {
    setService({ ...service, features });
  };

  const handlePriceRangeChange = (priceRange: string) => {
    setService({ ...service, priceRange });
  };

  const handleImageChange = (image: string) => {
    setService({ ...service, image });
  };

  const handleGalleryChange = (gallery: string[]) => {
    setService({ ...service, gallery });
  };

  const handleIsFeaturedChange = (isFeatured: boolean) => {
    setService({ ...service, isFeatured });
  };

  const handleStatusChange = (status: 'active' | 'inactive') => {
    setService({ ...service, status });
  };

  const handleLocationsChange = (locations: string[]) => {
    setService({ ...service, locations });
  };

  const handleEditorChange = (content: string) => {
    setService({ ...service, description: content });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (id) {
        await updateServiceMutate({ ...service, id: Number(id) });
        toast.success('Service updated successfully!');
      } else {
        await createServiceMutate(service);
        toast.success('Service created successfully!');
        navigate('/services');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to save service.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit Service' : 'Create New Service'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={service.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
          <Editor
            apiKey="no-api-key"
            onInit={(evt, editor) => editor.setContent(service.description)}
            initialValue={service.description}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <ServiceCategories
          category={service.category}
          onChange={handleChange}
        />
        <PricingManager
          priceRange={service.priceRange}
          onChange={handlePriceRangeChange}
        />
        <ServiceGallery
          image={service.image}
          gallery={service.gallery}
          onImageChange={handleImageChange}
          onGalleryChange={handleGalleryChange}
        />
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Features</label>
          <textarea
            id="features"
            value={service.features.join(', ')}
            onChange={(e) => handleFeaturesChange(e.target.value.split(','))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Locations</label>
          <textarea
            id="locations"
            value={service.locations.join(', ')}
            onChange={(e) => handleLocationsChange(e.target.value.split(','))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={service.isFeatured}
              onChange={(e) => handleIsFeaturedChange(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Featured</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="status"
              value="active"
              checked={service.status === 'active'}
              onChange={() => handleStatusChange('active')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Active</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={service.status === 'inactive'}
              onChange={() => handleStatusChange('inactive')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
        <button
          type="submit"
          disabled={isUpdating || isCreating}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isUpdating || isCreating ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {isUpdating || isCreating ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default ServiceEditor;