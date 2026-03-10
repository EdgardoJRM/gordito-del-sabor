export default function BrandSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black py-20">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto text-center space-y-12 px-4">
          {/* Headline */}
          <h2 className="text-5xl md:text-7xl lg:text-[80px] font-semibold leading-tight text-white">
            Cocinar es cultura.
          </h2>

          {/* Copy */}
          <div className="text-xl md:text-2xl text-[#A1A1A6] leading-relaxed space-y-8 max-w-4xl mx-auto">
            <p>
              El Gordito del Sabor nació para llevar el verdadero sazón boricua a todas las cocinas.
            </p>
            <p>
              Aquí compartimos recetas, ideas y tips para que cocines brutal, desde platos tradicionales hasta inventos nuevos con sabor a casa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
