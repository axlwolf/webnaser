import React from 'react';

interface Props {
  priceRange: string;
  onChange: (priceRange: string) => void;
}

const PricingManager = ({ priceRange, onChange }: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor="priceRange" className="block text-gray-700 font-bold mb-2">Price Range</label>
      <input
        type="text"
        id="priceRange"
        name="priceRange"
        value={priceRange}
        onChange={(e) => onChange(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default PricingManager;