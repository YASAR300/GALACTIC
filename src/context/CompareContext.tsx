import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface CompareContextValue {
  selected: number[];
  toggleSelect: (id: number) => void;
  clear: () => void;
  remove: (id: number) => void;
  max: number;
}

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

const MAX_COMPARE = 3;

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem('compare');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem('compare', JSON.stringify(selected)); } catch {}
  }, [selected]);

  const toggleSelect = (id: number) => {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= MAX_COMPARE) return prev; // cap
      return [...prev, id];
    });
  };

  const clear = () => setSelected([]);
  const remove = (id: number) => setSelected(prev => prev.filter(x => x !== id));

  const value = useMemo(() => ({ selected, toggleSelect, clear, remove, max: MAX_COMPARE }), [selected]);

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
} 