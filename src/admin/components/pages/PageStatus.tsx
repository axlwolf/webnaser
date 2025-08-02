import React from 'react';

interface Props {
  status: 'draft' | 'published' | 'archived';
  onChange: (status: 'draft' | 'published' | 'archived') => void;
}

const PageStatus = ({ status, onChange }: Props) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Status</h3>
      <div className="flex space-x-4">
        <button
          onClick={() => onChange('draft')}
          className={`px-4 py-2 rounded ${status === 'draft' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Draft
        </button>
        <button
          onClick={() => onChange('published')}
          className={`px-4 py-2 rounded ${status === 'published' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Published
        </button>
        <button
          onClick={() => onChange('archived')}
          className={`px-4 py-2 rounded ${status === 'archived' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Archived
        </button>
      </div>
    </div>
  );
};

export default PageStatus;