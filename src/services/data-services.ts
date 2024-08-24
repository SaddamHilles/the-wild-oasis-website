import { eachDayOfInterval } from 'date-fns';
import { createClient } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { CabinType } from '@/utils/types.t';

type Guest = {
  id: number;
  email: string;
  // add other fields as needed
};

type Booking = {
  id: number;
  guestId: number;
  cabinId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  created_at: string;
  cabins: {
    name: string;
    image: string;
  };
};

type Country = {
  name: string;
  flag: string;
};

export type Settings = {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};

/////////////
// GET

export async function getCabin(id: number): Promise<CabinType | null> {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function getCabinPrice(
  id: number,
): Promise<{ regularPrice: number; discount: number } | null> {
  const { data, error } = await supabase
    .from('cabins')
    .select('regularPrice, discount')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export const getCabins = async function (): Promise<CabinType[]> {
  const { data, error } = await supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image, description')
    .order('name');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data ?? [];
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<Guest | null> {
  const { data } = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single();

  return data;
}

export async function getBooking(id: number): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }

  return data;
}

export async function getBookings(guestId: number): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)',
    )
    .eq('guestId', guestId)
    .order('startDate');
  console.log('data: ', data);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return [];
}

export async function getBookedDatesByCabinId(
  cabinId: number,
): Promise<Date[]> {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  // today = today.toISOString();

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${today.toISOString()},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  const bookedDates: Date[] = data
    .map(booking =>
      eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      }),
    )
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<Settings | null> {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
}

export async function getCountries(): Promise<Country[]> {
  console.log('asdlkjasd');
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag',
    );
    console.log('res: ', res);
    const countries: Country[] = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

/////////////
// CREATE

export async function createGuest(
  newGuest: Partial<Guest>,
): Promise<Guest | null> {
  const { data, error } = await supabase.from('guests').insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data ? data[0] : null;
}

export async function createBooking(
  newBooking: Partial<Booking>,
): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(
  id: number,
  updatedFields: Partial<Guest>,
): Promise<Guest | null> {
  const { data, error } = await supabase
    .from('guests')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
  return data;
}

export async function updateBooking(
  id: number,
  updatedFields: Partial<Booking>,
): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id: number): Promise<Booking | null> {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
