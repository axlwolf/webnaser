import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useQuery, useMutation } from 'react-query';
import { getPage, updatePage, createPage } from '../../services/adminApi';
import SEOSettings from './SEOSettings';
import PageStatus from './PageStatus';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Page {
  id?: number;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const PageEditor = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<Page>({ title: '', slug: '', content: '', status: 'draft', seo: { title: '', description: '', keywords: [] } });

  const { data: existingPage, isLoading } = useQuery(['page', id], () => getPage(Number(id)), { enabled: !!id });
  const { mutateAsync: updatePageMutate, isLoading: isUpdating } = useMutation(updatePage);
  const { mutateAsync: createPageMutate, isLoading: isCreating } = useMutation(createPage);

  useEffect(() => {
    if (existingPage) {
      setPage(existingPage);
    }
  }, [existingPage]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPage({ ...page, [event.target.name]: event.target.value });
  };

  const handleSEOChange = (name: string, value: string) => {
    setPage({ ...page, seo: { ...page.seo, [name]: value } });
  };

  const handleStatusChange = (status: 'draft' | 'published' | 'archived') => {
    setPage({ ...page, status });
  };

  const handleEditorChange = (content: string) => {
    setPage({ ...page, content });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (id) {
        await updatePageMutate({ ...page, id: Number(id) });
        toast.success('Page updated successfully!');
      } else {
        await createPageMutate(page);
        toast.success('Page created successfully!');
        navigate('/pages');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to save page.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit Page' : 'Create New Page'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={page.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="slug" className="block text-gray-700 font-bold mb-2">Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={page.slug}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
          <Editor
            apiKey="no-api-key"
            onInit={(evt, editor) => editor.setContent(page.content)}
            initialValue={page.content}
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
        <SEOSettings
          seo={page.seo}
          onChange={handleSEOChange}
        />
        <PageStatus
          status={page.status}
          onChange={handleStatusChange}
        />
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

export default PageEditor;