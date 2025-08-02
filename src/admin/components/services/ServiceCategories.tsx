import React from 'react';

interface Props {
  category: 'prevision' | 'inmediata' | 'cremacion' | 'traslados' | 'velacion';
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ServiceCategories = ({ category, onChange }: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
      <select
        id="category"
        name="category"
        value={category}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="prevision">Previsión Funeraria</option>
        <option value="inmediata">Necesidad Inmediata</option>
        <option value="cremacion">Cremación</option>
        <option value="traslados">Traslados</option>
        <option value="velacion">Velación</option>
      </select>
    </div>
  );
};

export default ServiceCategories;