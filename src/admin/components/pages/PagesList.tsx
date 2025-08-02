import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPages } from '../../services/adminApi';

interface Page {
  id: number;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
}

const PagesList = () => {
  const { data: pages, isLoading, error } = useQuery(['pages'], getPages);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading pages</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Pages List</h2>
      <Link to="/pages/new" className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4">
        Create New Page
      </Link>
      <ul className="space-y-2">
        {pages.map((page: Page) => (
          <li key={page.id} className="flex justify-between">
            <span className="text-gray-700">{page.title}</span>
            <span className={`text-sm ${page.status === 'published' ? 'text-green-500' : 'text-gray-500'}`}>{page.status}</span>
            <Link to={`/pages/${page.id}/edit`} className="text-blue-500 font-bold">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PagesList;