'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Props {
  className?: string;
}
function FilterCabinsByURL({ className }: Props) {
  const [filterType, setFilterType] = useState('all');
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    router.replace(`${pathname}/?capacity=${filterType}`, { scroll: false });
  }, [filterType, router, pathname]);
  return (
    <div>
      <select
        name='filterCabins'
        id=''
        className={`text-primary-950 px-6 py-2 rounded ${className}`}
        onChange={e => setFilterType(e.target.value)}
      >
        <option value='small'>Small</option>
        <option value='mediam'>Mediam</option>
        <option value='large'>Large</option>
        <option value='all'>All</option>
      </select>
    </div>
  );
}

export default FilterCabinsByURL;
