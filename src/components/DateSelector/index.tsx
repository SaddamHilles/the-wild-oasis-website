'use client';

import { useReservation } from '@/context';
import { CabinType, Nullable, SettingType } from '@/utils/types.t';
import { isWithinInterval } from 'date-fns';
import { useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface Range {
  from: Date | null;
  to: Date | null;
}

function isAlreadyBooked(range: any, datesArr: Date[]): boolean {
  if (!range.from || !range.to) {
    return false; // Ensure both `from` and `to` are valid before proceeding
  }

  return datesArr.some(date =>
    isWithinInterval(date, { start: range.from, end: range.to }),
  );
}
interface Props {
  cabin: CabinType;
  settings: Nullable<SettingType>;
  bookedDates: Date[];
}
// type RangeType = {from:Nullable<Date>, to:Nullable<Date>}

function DateSelector({ cabin, settings, bookedDates }: Props) {
  const { range, setRange, resetRange } = useReservation();
  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  // SETTINGS
  if (!settings) return null;

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className='flex flex-col justify-between'>
      <DayPicker
        className='pt-12 place-self-center'
        mode='range'
        onSelect={range =>
          setRange(range ?? { from: undefined, to: undefined })
        }
        selected={range}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout='dropdown'
        numberOfMonths={2}
      />

      <div className='flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]'>
        <div className='flex items-baseline gap-6'>
          <p className='flex gap-2 items-baseline'>
            {discount > 0 ? (
              <>
                <span className='text-2xl'>${regularPrice - discount}</span>
                <span className='line-through font-semibold text-primary-700'>
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className='text-2xl'>${regularPrice}</span>
            )}
            <span className=''>/night</span>
          </p>
          {numNights ? (
            <>
              <p className='bg-accent-600 px-3 py-2 text-2xl'>
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className='text-lg font-bold uppercase'>Total</span>{' '}
                <span className='text-2xl font-semibold'>${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className='border border-primary-800 py-2 px-4 text-sm font-semibold z-10 bg-accent-500'
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
