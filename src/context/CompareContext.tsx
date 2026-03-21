"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface CompareBarber {
  slug: string;
  name: string;
  fadeScore: number;
}

interface CompareContextValue {
  selectedBarbers: CompareBarber[];
  toggle: (barber: CompareBarber) => void;
  clear: () => void;
  isSelected: (slug: string) => boolean;
  isFull: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

const MAX_COMPARE = 4;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedBarbers, setSelectedBarbers] = useState<CompareBarber[]>([]);

  const toggle = useCallback((barber: CompareBarber) => {
    setSelectedBarbers((prev) => {
      const exists = prev.find((b) => b.slug === barber.slug);
      if (exists) return prev.filter((b) => b.slug !== barber.slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, barber];
    });
  }, []);

  const clear = useCallback(() => setSelectedBarbers([]), []);

  const isSelected = useCallback(
    (slug: string) => selectedBarbers.some((b) => b.slug === slug),
    [selectedBarbers]
  );

  const isFull = selectedBarbers.length >= MAX_COMPARE;

  return (
    <CompareContext.Provider value={{ selectedBarbers, toggle, clear, isSelected, isFull }}>
      {children}
    </CompareContext.Provider>
  );
}

const NOOP_CONTEXT: CompareContextValue = {
  selectedBarbers: [],
  toggle: () => {},
  clear: () => {},
  isSelected: () => false,
  isFull: false,
};

export function useCompare() {
  const ctx = useContext(CompareContext);
  return ctx ?? NOOP_CONTEXT;
}
