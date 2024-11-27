import { auth } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navigation = async () => {
  const session = await auth();

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
          <Link href={'/account'} className='flex items-center gap-2'>
            {session?.user?.image && session?.user?.name && (
              <Image
                src={session?.user?.image?.toString()}
                alt={session?.user?.name?.toString()}
                width={28}
                height={28}
                className='rounded-full'
                referrerPolicy='no-referrer'
              />
            )}
            Cuest area
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
