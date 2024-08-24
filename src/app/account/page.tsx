import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Account',
};
const AccountPage = () => {
  return (
    <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
      Welcome, Seraj
    </h2>
  );
};

export default AccountPage;
