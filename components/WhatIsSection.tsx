export default function WhatIsSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-950">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-white">Más que recetas.</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Es una forma de cocinar.
            </span>
          </h2>

          {/* Copy */}
          <div className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-6">
            <p>
              El Gordito del Sabor nació para llevar el verdadero sazón boricua a todas las cocinas.
            </p>
            <p>
              Aquí encuentras recetas, tips y contenido para que cocines brutal, desde platos tradicionales hasta inventos nuevos con sabor a casa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
