import React from 'react';
import { Page } from '../../types/admin.types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  page: Page;
}

const PagePreview = ({ page }: Props) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Page Preview</h2>
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PagePreview;