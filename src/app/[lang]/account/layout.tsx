import SideNavigation from '@/components/SideNavigation';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}
export default function AccountLayout({ children }: Props) {
  return (
    <div className='grid grid-cols-[16rem_1fr] h-full gap-12'>
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}
