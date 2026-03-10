'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteRecipe {
  id: string;
  title: string;
  category: string;
  description: string;
  savedAt: string;
}

interface FavoritesStore {
  favorites: FavoriteRecipe[];
  addFavorite: (recipe: FavoriteRecipe) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getFavorites: () => FavoriteRecipe[];
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (recipe) => {
        set((state) => {
          const exists = state.favorites.some((fav) => fav.id === recipe.id);
          if (exists) return state;
          return {
            favorites: [...state.favorites, { ...recipe, savedAt: new Date().toISOString() }],
          };
        });
      },
      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        }));
      },
      isFavorite: (id) => {
        return get().favorites.some((fav) => fav.id === id);
      },
      getFavorites: () => {
        return get().favorites;
      },
      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
