import React from 'react';
import DateSelector from '../DateSelector';
import ReservationForm from '../ReservationForm';
import { getBookedDatesByCabinId, getSettings } from '@/services/data-services';
import { CabinType } from '@/utils/types.t';

interface Props {
  cabin: CabinType;
}
async function Reservation({ cabin }: Props) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className='grid grid-cols-2 border border-primary-800 min-h-[400px]'>
      <DateSelector
        settings={settings}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;
