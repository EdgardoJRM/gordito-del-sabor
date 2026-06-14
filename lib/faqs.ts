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
    label: 'Preventa',
    items: [
      {
        q: '¿Qué es la preventa oficial?',
        a: 'Es la primera producción del Delantal “Esto es bello” hecha para la comunidad. Por eso el tiempo de entrega es por ronda, no inventario infinito.',
      },
      {
        q: '¿Cuánto tarda en llegar mi delantal?',
        a: 'Aproximadamente 4 semanas desde tu orden. Lo decimos claro desde el principio: no es mercancía genérica en un almacén, es producción con intención.',
      },
      {
        q: '¿Qué recibo el mismo día que ordeno?',
        a: 'El ebook digital de cortesía y tu cupón del 10% para la próxima compra (según cómo esté configurado tu checkout y email).',
      },
    ],
  },
  {
    id: 'delantal',
    label: 'Delantal',
    items: [
      {
        q: '¿Qué incluye el Delantal oficial?',
        a: 'El delantal con diseño exclusivo, ebook digital de cortesía y 10% OFF en tu próxima orden oficial, más el storytelling de ser parte del lanzamiento.',
      },
      {
        q: '¿Puedo cambiar talla o color después?',
        a: 'Si necesitas cambiar datos de la orden, escríbenos lo antes posible a soporte. Una vez en producción, puede haber limitaciones.',
      },
      {
        q: '¿Hacen devoluciones?',
        a: 'Queremos que quedes feliz. Si hay un defecto de fabricación, lo resolvemos. Para preferencias de talla/color, revisa la política al activar checkout.',
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
        q: '¿Envían a Puerto Rico y Estados Unidos?',
        a: 'Sí, esa es la intención. Costos exactos se confirman en checkout según peso y carrier.',
      },
      {
        q: '¿Puedo cambiar mi dirección?',
        a: 'Escríbenos a soporte con tu número de orden. Mientras no haya salido de producción, casi siempre se puede ajustar.',
      },
    ],
  },
  {
    id: 'pagos',
    label: 'Pagos',
    items: [
      {
        q: '¿Qué métodos de pago aceptan?',
        a: 'Los que habilites en tu pasarela (tarjeta, Apple Pay, etc.). El sitio enlaza a checkout externo configurable.',
      },
      {
        q: '¿El pago es seguro?',
        a: 'Sí: el cobro ocurre en la plataforma de pago que conectes (Stripe, Shopify, etc.), no guardamos tarjetas en este sitio.',
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
