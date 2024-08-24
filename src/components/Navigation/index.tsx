import Link from 'next/link';
import React from 'react';

const Navigation = () => {
  return (
    <nav className='z-50'>
      <ul className='flex gap-8 text-primary-50'>
        <li>
          <Link href={'/cabins'}>Cabin</Link>
        </li>
        <li>
          <Link href={'/about'}>About</Link>
        </li>
        <li>
          <Link href={'/account'}>Cuest area</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
