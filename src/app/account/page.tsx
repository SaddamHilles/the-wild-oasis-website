import { auth } from '@/lib/auth';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Account',
};
const AccountPage = async () => {
  const session = await auth();
  return (
    <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
      Welcome, {session?.user?.name?.split(' ')[0]}
    </h2>
  );
};

export default AccountPage;
