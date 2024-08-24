import Spinner from '@/components/Spinners/Spinner';
import React from 'react';

function Loading() {
  return (
    <div className='grid items-center justify-center'>
      <Spinner />
      <p className='text-xl text-primary-200'>Loading cabins data...</p>
    </div>
  );
}

export default Loading;
