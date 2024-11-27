import React from 'react';
import DateSelector from '../DateSelector';
import ReservationForm from '../ReservationForm';
import { getBookedDatesByCabinId, getSettings } from '@/services/data-services';
import { CabinType } from '@/utils/types.t';
import { auth } from '@/lib/auth';
import LoginMessage from '../LoginMessage';

interface Props {
  cabin: CabinType;
}
async function Reservation({ cabin }: Props) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();
  return (
    <div className='grid grid-cols-2 border border-primary-800 min-h-[400px]'>
      <DateSelector
        settings={settings}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
