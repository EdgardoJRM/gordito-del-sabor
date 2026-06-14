import SectionHeader from '@/components/ui/SectionHeader';

export default function EcosystemEmotional() {
  return (
    <section className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8]">
      <div className="container-custom max-w-4xl mx-auto text-center">
        <SectionHeader
          eyebrow="Esto no es mercancía"
          title="Esto no es un delantal genérico"
          subtitle="Es el símbolo de una comunidad que cocina con pasión, sazón y propósito. Detrás de cada receta hay familia, memoria y orgullo boricua."
        />
        <p className="body-text text-lg text-[#1A1412] font-medium">— El Gordito</p>
      </div>
    </section>
  );
}
