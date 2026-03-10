'use client';

export default function SaborSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
          {/* Imagen grande */}
          <div className="relative h-[600px] rounded-3xl overflow-hidden">
            <img
              src="/images/gordito-cooking.jpg"
              alt="El Gordito cocinando"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Placeholder si no existe la imagen
                e.currentTarget.src = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80';
              }}
            />
          </div>

          {/* Texto */}
          <div className="space-y-8">
            <h2 className="heading-section">
              El sabor empieza
              <br />
              en casa.
            </h2>
            <p className="body-text text-xl md:text-2xl">
              Recetas boricuas, sazón casero y una comunidad que cocina con respeto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
