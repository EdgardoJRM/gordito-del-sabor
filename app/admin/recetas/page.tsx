'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface RecipeData {
  _id: string;
  title: string;
  category: string;
  description?: string;
  image?: string;
  isPremium?: boolean;
  createdAt: string;
}

export default function AdminRecetas() {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<RecipeData | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    isPremium: false,
  });
  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => {
    if (!isAdmin) return;

    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/recipes-favorites');
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const data = await res.json();
        setRecipes(data.recipes || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [isAdmin]);

  const handleOpenModal = (recipe?: RecipeData) => {
    if (recipe) {
      setEditingRecipe(recipe);
      setFormData({
        title: recipe.title,
        category: recipe.category,
        description: recipe.description || '',
        image: recipe.image || '',
        isPremium: recipe.isPremium || false,
      });
    } else {
      setEditingRecipe(null);
      setFormData({
        title: '',
        category: '',
        description: '',
        image: '',
        isPremium: false,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRecipe(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      image: '',
      isPremium: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const method = editingRecipe ? 'PUT' : 'POST';
      const body = editingRecipe
        ? { id: editingRecipe._id, ...formData }
        : formData;

      const res = await fetch('/api/admin/recipe-crud', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || 'Error al guardar receta');
        return;
      }

      // Recargar recetas
      const recipesRes = await fetch('/api/admin/recipes-favorites');
      const recipesData = await recipesRes.json();
      setRecipes(recipesData.recipes || []);

      handleCloseModal();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar receta');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (recipeId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta receta?')) return;

    try {
      const res = await fetch('/api/admin/recipe-crud', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: recipeId }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || 'Error al eliminar receta');
        return;
      }

      setRecipes(recipes.filter((r) => r._id !== recipeId));
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar receta');
    }
  };

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
          <div className="flex items-center justify-between">
            <h1 className="heading-section text-white">Gestión de Recetas</h1>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-[#FF3B30] hover:bg-[#FF453A] text-white font-bold py-3 px-6 rounded-full transition-all"
            >
              <Plus size={20} />
              Nueva Receta
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recetas</h2>
              <span className="text-[#A1A1A6] text-sm">Total: {recipes.length}</span>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF3B30] mx-auto mb-4"></div>
                <p className="text-[#A1A1A6]">Cargando recetas...</p>
              </div>
            ) : recipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#A1A1A6] text-lg">No hay recetas registradas aún</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="px-6 py-4 text-left font-bold text-white">Título</th>
                      <th className="px-6 py-4 text-left font-bold text-white">Categoría</th>
                      <th className="px-6 py-4 text-left font-bold text-white">Premium</th>
                      <th className="px-6 py-4 text-left font-bold text-white">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipes.map((recipe) => (
                      <tr key={recipe._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-white font-semibold">{recipe.title}</td>
                        <td className="px-6 py-4 text-[#A1A1A6]">{recipe.category}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              recipe.isPremium
                                ? 'bg-[#FF3B30]/20 text-[#FF3B30]'
                                : 'bg-green-500/20 text-green-400'
                            }`}
                          >
                            {recipe.isPremium ? '🔒 Premium' : 'Pública'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleOpenModal(recipe)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                              title="Editar"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(recipe._id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#1C1C1E] border border-white/10 rounded-2xl max-w-md w-full p-8 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingRecipe ? 'Editar Receta' : 'Nueva Receta'}
              </h2>
              <button onClick={handleCloseModal} className="text-[#A1A1A6] hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-white mb-2">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-[#6E6E73] focus:outline-none focus:ring-2 focus:ring-[#FF3B30]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">Categoría</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-[#6E6E73] focus:outline-none focus:ring-2 focus:ring-[#FF3B30]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-[#6E6E73] focus:outline-none focus:ring-2 focus:ring-[#FF3B30]"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">URL de Imagen</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-[#6E6E73] focus:outline-none focus:ring-2 focus:ring-[#FF3B30]"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPremium"
                  checked={formData.isPremium}
                  onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <label htmlFor="isPremium" className="text-sm font-bold text-white">
                  Receta Premium (requiere login)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-[#FF3B30] text-white rounded-lg hover:bg-[#FF453A] transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
