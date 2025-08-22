import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface FavoritesContextValue {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const isFavorite = (id: number) => favorites.includes(id);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const clearFavorites = () => setFavorites([]);

  const value = useMemo(() => ({ favorites, isFavorite, toggleFavorite, clearFavorites }), [favorites]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
} 