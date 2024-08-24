'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';
interface Props {
  navItems: { cabin: string; about: string; cuest_area: string };
}
const Navigation = ({ navItems }: Props) => {
  const { lang } = useParams();

  return (
    <nav className='z-50'>
      <ul className='flex gap-8 text-primary-50'>
        <li>
          <Link href={`/${lang}/cabins`}>{navItems.cabin}</Link>
        </li>
        <li>
          <Link href={`/${lang}/about`}>{navItems.about}</Link>
        </li>
        <li>
          <Link href={`/${lang}/account`}>{navItems.cuest_area}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
