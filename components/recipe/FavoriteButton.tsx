'use client';

import { Heart } from 'lucide-react';
import { useFavoritesStore } from '@/lib/favorites-store';
import { useState, useEffect } from 'react';

interface FavoriteButtonProps {
  recipeId: string;
  recipeTitle: string;
  recipeCategory: string;
  recipeDescription: string;
  className?: string;
}

export default function FavoriteButton({
  recipeId,
  recipeTitle,
  recipeCategory,
  recipeDescription,
  className = '',
}: FavoriteButtonProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsLiked(isFavorite(recipeId));
  }, [recipeId, isFavorite]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiked) {
      removeFavorite(recipeId);
      setIsLiked(false);
    } else {
      addFavorite({
        id: recipeId,
        title: recipeTitle,
        category: recipeCategory,
        description: recipeDescription,
        savedAt: new Date().toISOString(),
      });
      setIsLiked(true);
    }
  };

  if (!isMounted) {
    return (
      <button
        className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
        disabled
      >
        <Heart size={24} className="text-gray-300" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
      title={isLiked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <Heart
        size={24}
        className={`transition-colors ${
          isLiked
            ? 'fill-[#C4472B] text-[#C4472B]'
            : 'text-[#9C8B80] hover:text-[#C4472B]'
        }`}
      />
    </button>
  );
}
