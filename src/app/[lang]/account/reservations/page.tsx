import ReservationCard from '@/components/Reservations/ReservationCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reservations',
};

interface Bookings {
  id: number;
  guestId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  created_at: string;
  cabins: {
    name: string;
    image: string;
  };
}
export default function ReservationsPage() {
  // CHANGE
  const bookings: Bookings[] = [];

  return (
    <div>
      <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className='text-lg'>
          You have no reservations yet. Check out our{' '}
          <a className='underline text-accent-500' href='/cabins'>
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ul className='space-y-6'>
          {bookings.map(booking => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
