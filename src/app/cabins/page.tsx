import CabinCard from '@/components/CabinCard';
import CabinList, { FilterTypes } from '@/components/CabinList';
import FilterCabinsByURL from '@/components/FilterCabinsByURL';
import Spinner from '@/components/Spinners/Spinner';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Cabins',
};

type SearchParams = {
  capacity: FilterTypes;
};
interface Props {
  searchParams: SearchParams;
}
function CabinsPage({ searchParams }: Props) {
  const filter = searchParams?.capacity ?? 'all';
  return (
    <div>
      <h1 className='text-4xl mb-5 text-accent-400 font-medium'>
        Our Luxury Cabins
      </h1>
      <p className='text-primary-200 text-lg mb-10'>
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className='flex justify-end'>
        <FilterCabinsByURL className='mb-4' />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}

export default CabinsPage;
