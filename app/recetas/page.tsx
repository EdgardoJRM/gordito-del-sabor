import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ChefHat, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import { recipes } from '@/lib/recipes-data';

export const metadata: Metadata = {
  title: 'Recetas boricuas | El Gordito del Sabor',
  description:
    'Recetas puertorriqueñas claras y con sazón de verdad. Fáciles de seguir desde el celular o la cocina.',
};

export default function RecipesPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <section className="section-spacing-comfort bg-[#F2EDE6] border-b border-[#E8E0D8]">
        <div className="container-custom max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#6B5B4E] hover:text-[#1A1412] mb-8 transition-colors nav-text"
          >
            <ArrowLeft size={22} />
            Volver al inicio
          </Link>
          <p className="comfort-eyebrow text-[#6B5B4E] mb-3">Cocina con nosotros</p>
          <h1 className="heading-section-comfort text-[#1A1412] mb-4">Recetas boricuas</h1>
          <p className="body-text text-xl max-w-2xl">
            Platos con sazón de verdad. Toca una receta para ver ingredientes y pasos claros.
          </p>
        </div>
      </section>

      <section className="section-spacing-comfort bg-[#FAF8F5]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {recipes.map((recipe) => (
              <Link key={recipe.id} href={`/recetas/${recipe.id}`} className="group block">
                <article className="relative bg-white rounded-2xl overflow-hidden h-full flex flex-col border-2 border-[#E8E0D8] hover:border-[#C4472B]/50 transition-colors shadow-sm">
                  {recipe.isPremium && (
                    <div className="absolute top-4 right-4 z-10 bg-[#C4472B] text-white px-4 py-1.5 rounded-full text-sm font-bold">
                      Exclusiva
                    </div>
                  )}

                  <div className="relative h-52 md:h-56 overflow-hidden bg-[#F2EDE6]">
                    {recipe.image ? (
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized={recipe.image.startsWith('http')}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-[#C4472B]/50">
                          El Gordito del Sabor
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <span className="inline-block w-fit px-4 py-1.5 bg-[#F2EDE6] text-[#6B5B4E] text-sm font-bold rounded-full mb-4 border border-[#E8E0D8]">
                      {recipe.category}
                    </span>

                    <h2 className="text-2xl md:text-3xl font-bold text-[#1A1412] mb-3 group-hover:text-[#C4472B] transition-colors">
                      {recipe.title}
                    </h2>

                    <p className="body-text text-lg mb-6 flex-grow">{recipe.description}</p>

                    <div className="flex flex-wrap gap-5 text-base text-[#6B5B4E] border-t-2 border-[#E8E0D8] pt-5">
                      <div className="flex items-center gap-2">
                        <Clock size={20} className="text-[#C4472B]" aria-hidden />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={20} className="text-[#C4472B]" aria-hidden />
                        <span>{recipe.servings} porciones</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChefHat size={20} className="text-[#C4472B]" aria-hidden />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing-comfort bg-[#1A1412] text-center">
        <div className="container-custom max-w-2xl space-y-6">
          <h2 className="heading-section-comfort text-[#FAF8F5]">
            ¿Quieres cocinar con estilo?
          </h2>
          <p className="text-xl text-[#C4B8AE] leading-relaxed">
            Delantal El Gordito — edición limitada de 100 unidades con bordado personalizado.
          </p>
          <Button href="/delantal-el-gordito" size="lg">
            Ver Delantal El Gordito
          </Button>
        </div>
      </section>
    </main>
  );
}
