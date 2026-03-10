export default function CommunitySection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black py-20">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto text-center space-y-12 px-4">
          {/* Headline */}
          <h2 className="text-5xl md:text-7xl lg:text-[80px] font-semibold leading-tight text-white">
            Una comunidad que
            <br />
            cocina con respeto.
          </h2>

          {/* Copy */}
          <div className="text-xl md:text-2xl text-[#A1A1A6] leading-relaxed space-y-8 max-w-4xl mx-auto">
            <p>
              Más de 160,000 personas siguen al Gordito del Sabor para aprender recetas y compartir el amor por la cocina boricua.
            </p>
            <p className="text-lg md:text-xl">
              Desde Puerto Rico hasta Estados Unidos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
