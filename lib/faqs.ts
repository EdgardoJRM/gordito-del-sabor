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
    label: 'Delantal El Gordito',
    items: [
      {
        q: '¿Cuántos delantales hay disponibles?',
        a: `Solo ${papaEvent.totalAprons} unidades en esta edición limitada. Cuando se agoten, no habrá más en esta ronda.`,
      },
      {
        q: '¿Cuánto tarda en llegar?',
        a: `Recogida en ${papaEvent.pickupLocation}: coordinamos contigo después de comprar. Envío por correo: ${papaEvent.mailDeliveryDays} en Puerto Rico.`,
      },
      {
        q: '¿Hay opción sin personalizar?',
        a: 'Sí. Elige Personalizado y en Stripe aplica el código 35SPECIAL — te queda en $35 (logo de la marca, sin nombre bordado). Es el mismo delantal de las fotos.',
      },
      {
        q: '¿Qué puedo escribir en el bordado?',
        a: `En Personalizado y VIP: nombres o apodos. Máximo ${papaEvent.maxEmbroideryChars} caracteres.`,
      },
    ],
  },
  {
    id: 'delantal',
    label: 'Ofertas y bundles',
    items: [
      {
        q: '¿Qué incluye cada oferta?',
        a: 'Sin personalizar ($35 con código 35SPECIAL en Stripe): delantal con logo + recetario. Personalizado ($49.99): nombre bordado + recetario. Personalizado VIP ($59.99): añade video de Ariel y grupo WhatsApp.',
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
        a: 'Las 20 recetas favoritas son el mismo contenido del PDF. Ya no está disponible por descarga gratuita: viene incluido con la compra del Delantal El Gordito.',
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
