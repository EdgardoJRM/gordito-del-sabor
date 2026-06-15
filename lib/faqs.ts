import { papaEvent } from '@/lib/papa-event';

export type FaqCategoryId = 'delantal' | 'boveda' | 'pagos' | 'envios' | 'sponsors' | 'preventa' | 'libro';

export type FaqItem = { q: string; a: string };

export type FaqCategory = {
  id: FaqCategoryId;
  label: string;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: 'preventa',
    label: 'Delantal de Papá',
    items: [
      {
        q: '¿Cuántos delantales hay disponibles?',
        a: `Solo ${papaEvent.totalAprons} unidades en esta edición del Día de los Padres. Cuando se agoten, no habrá más en esta ronda.`,
      },
      {
        q: '¿Llega antes del Día de los Padres?',
        a: `Sí, si ordenas antes del ${papaEvent.orderDeadlineLabel}. Enviamos por USPS Priority Mail en todo Puerto Rico.`,
      },
      {
        q: '¿Qué puedo escribir en el bordado?',
        a: `Nombres, apodos o frases cortas. Máximo ${papaEvent.maxEmbroideryChars} caracteres por delantal.`,
      },
    ],
  },
  {
    id: 'delantal',
    label: 'Ofertas y bundles',
    items: [
      {
        q: '¿Qué incluye cada oferta?',
        a: 'Premium ($49.99): delantal + recetario digital. VIP ($59.99): delantal + recetario + video de saludo de El Gordito. Legado ($84.99): 2 delantales + recetario.',
      },
      {
        q: '¿Es preventa o ya tienen stock?',
        a: 'Stock en mano. Ordenas hoy y entramos a bordar y empacar. Sin espera de producción por ronda.',
      },
      {
        q: '¿Hacen devoluciones?',
        a: 'Si hay un defecto de fabricación, lo resolvemos. Escríbenos con tu número de orden y fotos del producto.',
      },
    ],
  },
  {
    id: 'libro',
    label: 'Libro / ebook',
    items: [
      {
        q: '¿El libro es lo mismo que el recetario gratis?',
        a: 'Las 20 recetas favoritas son el corazón del contenido. El recetario en /recetario es lead magnet gratis; la página del libro puede venderse con bonos o bundle según tu campaña.',
      },
      {
        q: '¿En qué formato viene?',
        a: 'Digital (PDF) listo para celular, tablet o imprimir en casa.',
      },
    ],
  },
  {
    id: 'boveda',
    label: 'La Bóveda',
    items: [
      {
        q: '¿Qué es La Bóveda del Sabor?',
        a: 'Es el hogar digital donde organizamos recetas, videos, listas de compra y contenido premium para que cocines con guía, sin perderte en el scroll.',
      },
      {
        q: '¿Cómo accedo después de pagar?',
        a: 'Recibirás acceso por email con el enlace de la plataforma (cuando conectes el checkout real). Mientras tanto, los CTAs usan URLs configurables.',
      },
      {
        q: '¿Puedo cancelar?',
        a: 'Las políticas de suscripción o pago único dependen de cómo montes Stripe/Shopify. Aquí dejamos el copy listo; legal lo ajustas con tu checkout.',
      },
    ],
  },
  {
    id: 'envios',
    label: 'Envíos',
    items: [
      {
        q: '¿Envían a todo Puerto Rico?',
        a: 'Sí. Usamos USPS Priority Mail. El costo de envío se calcula en el checkout de Stripe según tu dirección.',
      },
      {
        q: '¿Puedo cambiar mi dirección?',
        a: 'Escríbenos a soporte con tu número de orden lo antes posible. Mientras no haya salido, casi siempre se puede ajustar.',
      },
    ],
  },
  {
    id: 'pagos',
    label: 'Pagos',
    items: [
      {
        q: '¿Qué métodos de pago aceptan?',
        a: 'Tarjetas principales a través de Stripe. Verás el cargo como El Gordito del Sabor en tu estado de cuenta.',
      },
      {
        q: '¿El pago es seguro?',
        a: 'Sí. El cobro ocurre en Stripe. Este sitio no guarda los datos de tu tarjeta.',
      },
    ],
  },
  {
    id: 'sponsors',
    label: 'Patrocinadores',
    items: [
      {
        q: '¿Cómo colabora una marca?',
        a: 'Llena el formulario en /patrocinadores con objetivo, presupuesto y fechas. Respondemos con opciones de reel, stories, receta patrocinada o campaña mensual.',
      },
      {
        q: '¿Tienen media kit?',
        a: 'Sí: métricas editables en la página de patrocinadores. Confirma cifras finales antes de cerrar con marcas.',
      },
      {
        q: '¿Ofrecen exclusividad por categoría?',
        a: 'Se puede negociar como add-on. Recomendamos separar collab tag de exclusividad y precio aparte.',
      },
    ],
  },
];
