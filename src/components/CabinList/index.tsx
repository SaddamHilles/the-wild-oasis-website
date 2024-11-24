import React from 'react';
import CabinCard from '../CabinCard';
import { CabinType } from '@/utils/types.t';
import { getCabins } from '@/services/data-services';

export type FilterTypes = 'small' | 'mediam' | 'large' | 'all' | '';
interface Props {
  filter: FilterTypes;
}
async function CabinList({ filter }: Props) {
  console.log('filter: ', filter);
  const cabins = await getCabins();

  if (!cabins.length) return null;
  const filteredCabins = cabins.filter(cabin => {
    if (filter === 'small') {
      return cabin.maxCapacity < 4;
    } else if (filter === 'mediam') {
      return cabin.maxCapacity < 9;
    } else if (filter === 'large') {
      return cabin.maxCapacity < 15;
    } else if (filter === 'all' || filter === '') {
      return cabin.maxCapacity < 999999;
    }
  });
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
      {filteredCabins.map(cabin => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
