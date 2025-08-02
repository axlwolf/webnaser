import React from 'react';

interface SEO {
  title: string;
  description: string;
  keywords: string[];
}

interface Props {
  seo: SEO;
  onChange: (name: string, value: string) => void;
}

const SEOSettings = ({ seo, onChange }: Props) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">SEO Settings</h3>
      <div className="mb-4">
        <label htmlFor="seoTitle" className="block text-gray-700 font-bold mb-2">Meta Title</label>
        <input
          type="text"
          id="seoTitle"
          value={seo.title}
          onChange={(e) => onChange('title', e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="seoDescription" className="block text-gray-700 font-bold mb-2">Meta Description</label>
        <textarea
          id="seoDescription"
          value={seo.description}
          onChange={(e) => onChange('description', e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="seoKeywords" className="block text-gray-700 font-bold mb-2">Meta Keywords</label>
        <input
          type="text"
          id="seoKeywords"
          value={seo.keywords.join(', ')}
          onChange={(e) => onChange('keywords', e.target.value.split(','))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};

export default SEOSettings;