import React from 'react';
import Logo from '../Logo';
import Navigation from '../Navigation';

interface Props {
  cabinTexts: {
    headerTitle: string;
    navItems: { cabin: string; about: string; cuest_area: string };
  };
}
const Header = ({ cabinTexts }: Props) => {
  console.log('cabinTexts: ', cabinTexts);
  return (
    <header className='border-b border-primary-900 px-8 py-5'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <Logo title={cabinTexts.headerTitle} />
        <Navigation navItems={cabinTexts.navItems} />
      </div>
    </header>
  );
};

export default Header;
