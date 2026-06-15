import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cow, Bill, EventItem } from './types';
import { defaultCows, defaultBills, defaultEvents } from './data';

interface AppState {
  cows: Cow[];
  bills: Bill[];
  events: EventItem[];
  isOperator: boolean;
  setCows: (cows: Cow[]) => void;
  setBills: (bills: Bill[]) => void;
  setEvents: (events: EventItem[]) => void;
  setIsOperator: (v: boolean) => void;
  addCow: (cow: Cow) => void;
  updateCow: (cow: Cow) => void;
  deleteCow: (id: string) => void;
  addBill: (bill: Bill) => void;
  deleteBill: (id: string) => void;
  addEvent: (event: EventItem) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (event: EventItem) => void;
}

const AppContext = createContext<AppState | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return fallback;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [cows, setCows] = useState<Cow[]>(() => loadFromStorage('gaushala_cows', defaultCows));
  const [bills, setBills] = useState<Bill[]>(() => loadFromStorage('gaushala_bills', defaultBills));
  const [events, setEvents] = useState<EventItem[]>(() => loadFromStorage('gaushala_events', defaultEvents));
  const [isOperator, setIsOperator] = useState(false);

  useEffect(() => { localStorage.setItem('gaushala_cows', JSON.stringify(cows)); }, [cows]);
  useEffect(() => { localStorage.setItem('gaushala_bills', JSON.stringify(bills)); }, [bills]);
  useEffect(() => { localStorage.setItem('gaushala_events', JSON.stringify(events)); }, [events]);

  const addCow = (cow: Cow) => setCows(prev => [...prev, cow]);
  const updateCow = (cow: Cow) => setCows(prev => prev.map(c => c.id === cow.id ? cow : c));
  const deleteCow = (id: string) => setCows(prev => prev.filter(c => c.id !== id));
  const addBill = (bill: Bill) => setBills(prev => [...prev, bill]);
  const deleteBill = (id: string) => setBills(prev => prev.filter(b => b.id !== id));
  const addEvent = (event: EventItem) => setEvents(prev => [...prev, event]);
  const deleteEvent = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));
  const updateEvent = (event: EventItem) => setEvents(prev => prev.map(e => e.id === event.id ? event : e));

  return (
    <AppContext.Provider value={{
      cows, bills, events, isOperator,
      setCows, setBills, setEvents, setIsOperator,
      addCow, updateCow, deleteCow, addBill, deleteBill, addEvent, deleteEvent, updateEvent,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}
