export default function FeaturesSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black py-20">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto px-4">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Recetas */}
            <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl p-10 text-center space-y-6 hover:border-gray-700 transition-all">
              <div className="text-6xl">🍳</div>
              <h3 className="text-3xl font-semibold text-white">Recetas</h3>
              <p className="text-lg text-[#A1A1A6] leading-relaxed">
                Aprende platos boricuas paso a paso.
              </p>
            </div>

            {/* Card 2 - Tips */}
            <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl p-10 text-center space-y-6 hover:border-gray-700 transition-all">
              <div className="text-6xl">🔥</div>
              <h3 className="text-3xl font-semibold text-white">Tips de cocina</h3>
              <p className="text-lg text-[#A1A1A6] leading-relaxed">
                Pequeños trucos para cocinar mejor.
              </p>
            </div>

            {/* Card 3 - Delantales */}
            <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl p-10 text-center space-y-6 hover:border-gray-700 transition-all">
              <div className="text-6xl">🧵</div>
              <h3 className="text-3xl font-semibold text-white">Delantales personalizados</h3>
              <p className="text-lg text-[#A1A1A6] leading-relaxed">
                Diseñados para los que viven en el fogón.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
