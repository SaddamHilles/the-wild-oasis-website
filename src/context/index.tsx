'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { DateRange } from 'react-day-picker';

const initialState: DateRange = { from: undefined, to: undefined };
interface RangeType {
  range: DateRange;
  setRange: Dispatch<SetStateAction<DateRange>>;
  resetRange: () => void;
}
const ReservationContext = createContext({} as RangeType);

interface ProviderProps {
  children: ReactNode;
}
function ReservationProvider({ children }: ProviderProps) {
  const [range, setRange] = useState<DateRange>(initialState);

  const resetRange = () => {
    setRange(initialState);
  };
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);

  if (context === undefined) {
    throw new Error('Context was used outside provider');
  }

  return context;
}

export { ReservationProvider, useReservation };
