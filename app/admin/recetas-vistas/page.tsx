'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeft, Eye } from 'lucide-react';
import { recipes } from '@/lib/recipes-data';
import { useEffect, useState } from 'react';

interface RecipeWithFavorites {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  favorites: number;
}

export default function AdminRecetasVistas() {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [recipesWithFavorites, setRecipesWithFavorites] = useState<RecipeWithFavorites[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setChecking(false);
      return;
    }

    if (status === 'authenticated') {
      const checkAdmin = async () => {
        try {
          const res = await fetch('/api/admin/check');
          const data = await res.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error('Error checking admin:', error);
          setIsAdmin(false);
        } finally {
          setChecking(false);
        }
      };

      checkAdmin();
    }
  }, [status]);

  // Cargar recetas con favoritos cuando es admin
  useEffect(() => {
    if (!isAdmin) return;

    const fetchRecipesWithFavorites = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/recipes-favorites');
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const data = await res.json();
        setRecipesWithFavorites(data.recipes || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        // Fallback: usar recetas sin favoritos
        const fallback = recipes.map((r) => ({
          id: r.id,
          title: r.title,
          category: r.category,
          description: r.description,
          image: r.image,
          favorites: 0,
        }));
        setRecipesWithFavorites(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesWithFavorites();
  }, [isAdmin]);

  if (status === 'loading' || checking) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF3B30] mx-auto mb-4"></div>
          <p className="text-[#A1A1A6]">Cargando...</p>
        </div>
      </main>
    );
  }

  if (status === 'unauthenticated' || !isAdmin) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-section text-white mb-4">Acceso Denegado</h1>
          <Link href="/" className="text-[#FF3B30] hover:text-[#FF453A]">
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-gray-900">
        <div className="container-custom py-6">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-[#FF3B30] hover:text-[#FF453A] mb-6 transition-colors">
            <ArrowLeft size={20} />
            Volver al Dashboard
          </Link>
          <h1 className="heading-section text-white">Recetas Más Guardadas</h1>
        </div>
      </header>

      {/* Content */}
      <div className="container-custom py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF3B30] mx-auto mb-4"></div>
            <p className="text-[#A1A1A6]">Cargando recetas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipesWithFavorites.map((recipe, index) => (
              <div key={recipe.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all">
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-[#FF3B30]/20 to-orange-600/20 flex items-center justify-center">
                  {recipe.image ? (
                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-6xl">🍳</span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-[#FF3B30]/20 text-[#FF3B30] text-xs font-semibold rounded-full">
                      {recipe.category}
                    </span>
                    <span className="text-2xl font-bold text-[#FF3B30]">#{index + 1}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {recipe.title}
                  </h3>

                  <p className="body-text text-[#A1A1A6] text-sm mb-4">
                    {recipe.description}
                  </p>

                  <div className="flex items-center gap-2 text-[#A1A1A6]">
                    <Eye size={18} />
                    <span className="text-sm font-semibold">❤️ {recipe.favorites} guardadas</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
