import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className='flex justify-center items-center'>
      <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0-3.868 3.132-7 7-7v4a1 1 0 011 1h3a1 1 0 110 2h-3a1 1 0 01-1-1V6a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 001 1h4a1 1 0 100-2h-4a1 1 0 00-1-1V6a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1h-3z'></path>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
