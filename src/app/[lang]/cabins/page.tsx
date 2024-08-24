import CabinCard from '@/components/CabinCard';
import { getCabins } from '@/services/data-services';
import { CabinType } from '@/utils/types.t';
import { Metadata } from 'next';
import React from 'react';
import { getDictionary, Locale } from '../dictionaries';

export const metadata: Metadata = {
  title: 'Cabins',
};

interface Props {
  params: {
    lang: Locale;
  };
}
const CabinPage = async ({ params: { lang } }: Props) => {
  const cabins = await getCabins();
  const dict = await getDictionary(lang);
  return (
    <div>
      <h1 className='text-4xl mb-5 text-accent-400 font-medium'>
        {dict.cabins.title}
      </h1>
      <p className='text-primary-200 text-lg mb-10'>
        {dict.cabins.description}
      </p>

      {cabins.length > 0 && (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
          {cabins.map(cabin => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CabinPage;
