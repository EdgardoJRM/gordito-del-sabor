import { siteConfig } from '@/lib/site-config';

export type PapaBundleId = 'premium' | 'vip' | 'legado';
export type PapaDeliveryMethod = 'pickup' | 'mail';

export type PapaBundle = {
  id: PapaBundleId;
  title: string;
  price: number;
  priceLabel: string;
  apronCount: number;
  badge?: string;
  recommended?: boolean;
  bullets: string[];
};

export const PAPA_EVENT_ID = 'el-sabor-de-papa-2026';

/** Ruta canónica de la página de venta. */
export const papaProductSlug = '/delantal-el-gordito' as const;

/** Nombre del producto en copy y UI. */
export const papaProductName = 'El Sabor de Papá' as const;

const stats = siteConfig.stats;

/** Fotos reales del Gordito/equipo para la landing. */
export const papaTeamPhotos = {
  hero: '/images/team/gordito-photos/IMG_3572.jpg',
  problem: '/images/team/gordito-photos/IMG_3526.jpg',
  solution: '/images/team/gordito-photos/IMG_3531.jpg',
  trust: '/images/team/gordito-photos/IMG_3526.jpg',
  gallery: [
    '/images/team/gordito-photos/IMG_3527.jpg',
    '/images/team/gordito-photos/IMG_3569.jpg',
  ],
} as const;

export const papaEvent = {
  id: PAPA_EVENT_ID,
  slug: papaProductSlug,
  totalAprons: 100,
  maxEmbroideryChars: 15,
  pickupLocation: 'Área Metro, San Juan',
  embroideryTurnaround: '24–48 horas',
  mailDeliveryDays: '3–5 días hábiles',
  socialProof: 'Recetas boricuas y sazón de verdad desde Puerto Rico',
} as const;

export const papaCtaMicroDefault =
  '¿Cuántos regalos más vas a dar que se olvidan antes de que acabe la semana?' as const;

export const papaCtaMicro = {
  default: papaCtaMicroDefault,
  scarcity:
    '¿Cuántos regalos más vas a dar que no dicen nada sobre la persona que los recibe?',
  qualification:
    '¿Cuántos regalos más vas a dar que no tienen el nombre de la persona que los recibe?',
  principles: '¿Cuántos regalos más vas a dar que se olvidan antes de que acabe el mes?',
  futurePacing: '¿Cuántos regalos más vas a dar que se olvidan en una semana?',
  valueStack:
    '¿Cuántos regalos más vas a dar que no tienen el nombre de esa persona bordado en ninguna parte?',
} as const;

/** Sección 1 — Call-out */
export const papaCallout = {
  text: 'Atención: personas que quieren regalar algo que no se olvida, quienes están cansados de gastar dinero en regalos genéricos que no dicen nada, los que buscan un regalo con nombre, identidad y significado real, y todos los que saben que la persona que van a honrar merece algo diferente.',
} as const;

/** Hero — combina call-out + sección 2 */
export const papaHero = {
  eyebrow: 'Delantal personalizado · bordado a mano',
  headline: 'Cada regalo sin nombre es un regalo que se olvida en una semana.',
  subheadline:
    'Un delantal con el nombre de esa persona bordado a mano no es un objeto. Es un reconocimiento. Solo hay unidades limitadas en Puerto Rico.',
  cta: 'Asegura el tuyo ahora',
  priceFrom: 'Desde $49.99',
} as const;

export const papaLossHeadline = {
  paragraphs: [
    'Piensas en esa persona. Quieres regalarle algo especial. Entras a una tienda o buscas en línea y terminas eligiendo lo mismo de siempre.',
    'Algo genérico. Algo bonito pero sin alma. Algo que no lleva el nombre de esa persona por ninguna parte.',
    'No es tu culpa. El mercado de regalos está lleno de objetos fabricados en serie para que cualquiera los compre para cualquiera.',
    'Pero hay una diferencia enorme entre regalar algo que se usa y regalar algo que se recuerda.',
    'Un delantal con el nombre de esa persona bordado a mano no es un objeto. Es un reconocimiento. Es decirle: tú eres el jefe de esta cocina. Tu nombre merece estar aquí.',
    'Cada vez que lo use, cada vez que lo vea colgado, cada vez que lo amarre, va a pensar en ti.',
    'Eso no lo hace ninguna camiseta. Eso no lo hace ninguna tarjeta de regalo.',
    'Solo hay unidades disponibles en Puerto Rico. Cuando se agoten, no hay segunda ronda.',
  ],
} as const;

/** Sección 3 — Escasez + precio */
export const papaEarlyUrgency = {
  eyebrow: 'Unidades limitadas',
  title: 'Cada delantal se borda a mano. No hay producción en masa.',
  intro:
    'Cuando se acaben, se acaban. No hay fecha de reposición confirmada. Elige tu oferta:',
  closing: 'Asegura el tuyo ahora.',
  micro: papaCtaMicro.scarcity,
  offers: [
    {
      id: 'premium' as const,
      title: 'PREMIUM',
      price: '$49.99',
      description:
        '1 delantal personalizado con bordado a mano, recetario digital Sabores de El Gordito, recogida en Área Metro o envío por correo.',
    },
    {
      id: 'vip' as const,
      title: 'VIP',
      price: '$59.99',
      description:
        '1 delantal personalizado con bordado a mano, recetario digital más video exclusivo de Ariel, acceso al grupo privado de WhatsApp de la comunidad, recogida o envío.',
    },
    {
      id: 'legado' as const,
      title: 'LEGADO',
      price: '$84.99',
      description:
        '2 delantales personalizados (dos nombres diferentes), recetario digital más video exclusivo, acceso al grupo privado de WhatsApp, recogida o envío.',
    },
  ],
} as const;

/** Sección 4 — Prueba social temprana */
export const papaSocialProofEarly = {
  eyebrow: 'Comunidad real',
  title: `Más de ${stats.instagram.replace('K+', ',000+')} personas en Puerto Rico y Latinoamérica confían en El Gordito del Sabor cada semana.`,
  paragraphs: [
    `${stats.facebook} familias activas en Facebook. ${stats.engagementMeta} de engagement promedio, uno de los más altos del sector de cocina en la región.`,
    `${stats.tiktok} seguidores en TikTok con ${stats.engagementTikTok} de engagement.`,
    `${stats.monthlyImpressions} de impresiones al mes. Gente real. Cocinas reales. Familias reales.`,
    'Esta no es una tienda anónima. Es una comunidad que Ariel de Valle ha construido durante años con recetas auténticas, sabor de verdad y amor por la cocina puertorriqueña.',
    `Cuando alguien recibe un delantal de El Gordito del Sabor, recibe un pedazo de todo eso.`,
  ],
} as const;

/** Sección 5 — La gran promesa */
export const papaBigPromise = {
  title: 'Con un solo regalo, la persona que quieres honrar va a saber exactamente lo que significa para ti.',
  paragraphs: [
    'No con palabras. Con su nombre bordado a mano en la pechera de un delantal hecho en Puerto Rico, respaldado por la comunidad de cocina más activa de la isla.',
    'Cada vez que cocine con él. Cada vez que lo vea en su cocina. Cada vez que lo amarre. Va a recordar que tú te tomaste el tiempo de hacer algo diferente.',
    'No más regalos que terminan en un cajón.',
    'No más dinero gastado en objetos que no dicen nada.',
    'Un delantal personalizado, bordado a mano, con la identidad de la marca que más cocina en Puerto Rico. Y con el nombre de quien tú quieras como protagonista.',
  ],
} as const;

/** Sección 6 — El enemigo común */
export const papaEnemy = {
  title: 'El enemigo de un regalo memorable tiene nombre: conveniencia sin intención.',
  intro:
    'Cada año, millones de personas hacen clic en el primer resultado de Amazon o entran al pasillo de regalos del supermercado más cercano y eligen lo que dice "para alguien especial" sin que ese alguien tenga nombre por ninguna parte.',
  examples: [
    'Una taza con un mensaje.',
    'Una camiseta con un chiste.',
    'Una vela aromática.',
    'Una tarjeta de regalo porque no se sabe qué comprar.',
  ],
  marketLine:
    'El mercado de regalos fue diseñado para vender volumen, no para ayudarte a decir algo real.',
  outcomes: [
    'El regalo se agradece con una sonrisa cortés.',
    'Se guarda en un cajón o en un closet.',
    'En una semana ya no se recuerda de dónde vino.',
  ],
  closing: [
    'No es que no quieras a esa persona. Es que nadie te ofreció una opción diferente.',
    'Tus ganas de hacer algo especial no fallaron. Las opciones que el mercado te pone enfrente sí.',
    'Un delantal con el nombre de esa persona bordado a mano no entra en esa categoría. No se guarda. No se olvida. Se usa, y cada vez que se usa, esa persona piensa en ti.',
  ],
} as const;

/** Sección 7 — Para quién funciona */
export const papaUniversality = {
  title: 'Un regalo personalizado no depende de la ocasión ni del tipo de persona que lo recibe.',
  intro:
    'Funciona porque el nombre de alguien en un objeto que usa todos los días transforma ese objeto en un símbolo de reconocimiento.',
  subtitle: 'Le ha funcionado a personas que regalan para:',
  occasions: [
    'Cumpleaños de alguien que cocina',
    'Aniversarios de pareja donde uno de los dos es el chef de la casa',
    'Graduaciones de alguien que está empezando su vida independiente',
    'Regalos de Navidad para quien lo tiene todo',
    'Día de las Madres para la mamá que alimenta a toda la familia',
    'Día de los Padres para el papá que reina en la parrilla',
    'Regalos entre amigos que comparten la pasión por cocinar',
    'Despedidas de soltera donde la novia es la reina de la cocina',
    'Regalos corporativos personalizados para equipos que se reúnen a cocinar',
    'Personas que quieren regalar algo hecho en Puerto Rico con orgullo',
    'Familias que tienen la tradición del fogón familiar',
    'Quien busca el regalo perfecto para alguien que ya tiene todo',
    'Personas que quieren regalar algo que se use de verdad, no que se guarde',
    'Quien quiere que su regalo tenga un lugar permanente en la vida de esa persona',
    'Familias que celebran a dos personas a la vez con el paquete de dos delantales',
  ],
  closing: 'Si la persona que quieres honrar tiene nombre y una cocina, este delantal es para ella.',
} as const;

/** Sección 8 — Este regalo es para ti si */
export const papaQualification = {
  title: 'Este delantal es para ti si:',
  forYou: [
    'Quieres regalar algo que esa persona use de verdad, no que guarde en un cajón.',
    'Estás cansado de buscar regalos genéricos que no dicen nada sobre quien los recibe.',
    'Quieres que esa persona piense en ti cada vez que cocine.',
    'Buscas algo hecho en Puerto Rico, con identidad, con sazón real.',
    'Quieres honrar a dos personas a la vez con un regalo que las una (oferta Legado).',
    'Quieres que el regalo incluya acceso a la comunidad de cocina más activa de la isla.',
    'Buscas algo que tenga el nombre de esa persona, no un mensaje genérico de tienda.',
  ],
  forYouClosing: 'Si te identificaste con aunque sea uno, este delantal se hizo para ti.',
  notForYouTitle: 'Para quien no es:',
  notForYou: [
    'Si buscas el regalo más barato posible sin importar lo que diga sobre la persona.',
    'Si no te importa si el regalo se usa o se guarda en un cajón.',
    'Si necesitas que llegue en el mismo día sin posibilidad de esperar el tiempo de bordado.',
  ],
  cta: 'Asegura el tuyo ahora. Unidades limitadas.',
  micro: papaCtaMicro.qualification,
} as const;

/** Sección 9 — Los 3 principios */
export const papaPrinciples = {
  title: 'Los 3 principios del regalo que se recuerda',
  items: [
    {
      title: 'Principio 1: Los regalos que se usan todos los días se recuerdan más que los que se guardan.',
      paragraphs: [
        'La mayoría de los regalos tienen una vida útil de cinco días.',
        'Se abre, se agradece, se pone en algún lugar de la casa y en una semana ya se mezcló con el resto de las cosas.',
        'Un delantal con el nombre de esa persona tiene un lugar en su cocina todos los días. Cada vez que cocine, su nombre está ahí. Cada vez que cocine, piensa en ti.',
        'El regalo que forma parte de la rutina diaria de esa persona es el que no se olvida nunca.',
      ],
    },
    {
      title: 'Principio 2: La personalización transforma un objeto en un símbolo.',
      paragraphs: [
        'Hay una diferencia enorme entre regalar un delantal y regalar un delantal con el nombre de esa persona bordado a mano.',
        'Uno es un objeto. El otro es un mensaje.',
        'Cuando esa persona ve su nombre en la pechera, lo que recibe no es "me compraron algo". Lo que recibe es: "me ven. Soy el chef de esta cocina. Soy especial."',
        'Ese mensaje no se compra en ningún pasillo de supermercado ni en ningún clic de Amazon. Se ordena, se borda a mano y se entrega con intención.',
      ],
    },
    {
      title: 'Principio 3: El regalo más recordado no es el más caro. Es el más significativo.',
      paragraphs: [
        'No hace falta gastar cientos de dólares para que alguien sienta que lo valoras de verdad.',
        'Hace falta elegir algo que tenga su identidad, su nombre y su historia.',
        `Desde $49.99 puedes dar un regalo hecho a mano, con el nombre de esa persona, respaldado por la comunidad de más de ${stats.instagram} personas que ya confían en El Gordito del Sabor.`,
      ],
    },
  ],
  cta: 'Asegura el tuyo ahora antes de que se agoten las unidades disponibles.',
  micro: papaCtaMicro.principles,
} as const;

/** Sección 10 — Carta del fundador */
export const papaFounderLetter = {
  from: 'Ariel de Valle, El Gordito del Sabor',
  location: 'Puerto Rico',
  paragraphs: [
    'Quiero hablarte directo, como si estuviéramos sentados en la misma cocina.',
    'Llevo años construyendo esta comunidad con un solo propósito: que la gente en Puerto Rico y más allá sienta que la cocina es un lugar de amor, de familia y de orgullo.',
    `${stats.instagram} personas nos siguen en Instagram. ${stats.facebook} en Facebook. ${stats.monthlyImpressions} de impresiones al mes.`,
    'Pero detrás de cada número hay una familia. Una cocina. Una persona que cocina con amor y que muchas veces lo hace en silencio, sin reconocimiento, sin que nadie le diga que es el chef de esa casa.',
    'Cuando pensé en un delantal personalizado, no pensé en un producto. Pensé en esa persona.',
    'La que cocina el arroz del domingo. La que guarda las recetas en un papel doblado. La que alimenta a todos y raramente recibe algo que lleve su nombre.',
    'Un delantal con su nombre bordado a mano es una forma de decirle: tu lugar en esta cocina tiene nombre. Y ese nombre eres tú.',
    'Lo hacemos a mano. Lo hacemos en Puerto Rico. Y lo hacemos para que quien lo recibe sienta lo que merece sentir.',
    'Gracias por confiar en nosotros para ese momento.',
  ],
  signature: 'Ariel de Valle',
  signatureTitle: 'El Gordito del Sabor',
  inlineFaqsTitle: 'Preguntas que me llegan constantemente:',
  inlineFaqs: [
    {
      q: 'El bordado, ¿tiene garantía de calidad?',
      a: 'Sí. Cada delantal sale revisado. Si hay algún defecto, lo corregimos sin costo adicional para ti.',
    },
    {
      q: '¿Puedo poner cualquier nombre o texto en el bordado?',
      a: 'Sí. En el siguiente paso al ordenar nos das exactamente lo que quieres bordar.',
    },
    {
      q: '¿En cuánto tiempo está listo el delantal?',
      a: `Cada pieza se borda en ${papaEvent.embroideryTurnaround} tras confirmar la orden.`,
    },
    {
      q: '¿Dónde es la recogida?',
      a: `El punto exacto te llega al completar tu orden. Está en el ${papaEvent.pickupLocation}.`,
    },
    {
      q: '¿Y si vivo fuera del Área Metro?',
      a: `Puedes elegir envío por correo al ordenar. El tiempo estimado es de ${papaEvent.mailDeliveryDays}.`,
    },
    {
      q: '¿Por qué solo unidades limitadas?',
      a: 'Porque cada delantal se borda a mano por nuestro equipo. No somos una fábrica. El límite existe para garantizar la calidad de cada pieza.',
    },
    {
      q: '¿El pago es seguro?',
      a: 'Sí. Procesamos con Stripe, uno de los sistemas de pago más seguros del mundo.',
    },
    {
      q: '¿Puedo pedir dos delantales con nombres diferentes?',
      a: 'Sí. El paquete Legado incluye dos delantales personalizados con nombres distintos.',
    },
    {
      q: '¿Qué pasa si necesito cambiar el nombre después de ordenar?',
      a: `Escríbenos a ${siteConfig.email} antes de que la pieza entre a producción.`,
    },
    {
      q: '¿El video exclusivo está disponible de inmediato?',
      a: 'Sí. Llega junto con el recetario digital al confirmar tu orden en los paquetes VIP y Legado.',
    },
  ],
} as const;

/** Sección 11 — El mecanismo */
export const papaMechanism = {
  title: `Hay dos cosas que convierten un delantal común en ${papaProductName}.`,
  pillars: [
    {
      title: 'Pilar 1: El bordado a mano con identidad permanente.',
      paragraphs: [
        'No es una impresión. No es un vinilo. No es una etiqueta.',
        `Es hilo sobre tela, bordado a mano por nuestro equipo en ${papaEvent.embroideryTurnaround}. El nombre queda permanente. No se borra con lavadas. No se pela. No desaparece con el tiempo.`,
        'La tela es 100% algodón premium con bolsillos reforzados. Esta pieza está diseñada para usarse todos los días, no para guardarse.',
      ],
    },
    {
      title: 'Pilar 2: El respaldo de una comunidad real que esa persona ya conoce.',
      paragraphs: [
        `Este delantal no viene de una tienda anónima. Viene de El Gordito del Sabor, la marca que ${stats.instagram} personas en Puerto Rico y Latinoamérica ya tienen en su cocina a través de recetas, videos y sazón de verdad.`,
        'Cuando esa persona recibe este delantal, recibe también acceso a ese universo: el recetario digital, el video exclusivo de Ariel y, en los niveles VIP y Legado, el grupo privado de WhatsApp con la comunidad activa.',
        'Cuando juntas el bordado personalizado con el respaldo de una comunidad que esa persona ya sigue y en la que ya confía, el resultado no es un delantal.',
        'Es un legado con nombre.',
      ],
    },
  ],
} as const;

/** Sección 12 — Imagina esto */
export const papaFuturePacing = {
  title: 'Imagina el momento en que esa persona abre el regalo.',
  paragraphs: [
    'Ve el delantal. Ve su nombre bordado en la pechera.',
    'No dice nada por un segundo.',
    'Luego lo amarra. Lo mira. Y sonríe de ese modo en que sonríe alguien cuando algo lo toca de verdad, cuando entiende que quien lo regaló se tomó el tiempo de hacer algo diferente.',
    'Ese momento no tiene precio. Pero tampoco cuesta cientos de dólares.',
    'Cuesta $49.99, $59.99 u $84.99, dependiendo de lo que quieras darle.',
    'Y dura para siempre, porque cada vez que esa persona cocine con ese delantal, ese momento regresa.',
    'Eso no es suerte. Es un regalo con intención.',
  ],
  cta: 'Asegura el tuyo ahora. Unidades limitadas.',
  micro: papaCtaMicro.futurePacing,
} as const;

/** Sección 14 — Antes y después */
export const papaBeforeAfter = {
  title: 'Antes y después',
  beforeTitle: `ANTES de ${papaProductName}:`,
  before: [
    'Buscando el regalo correcto entre opciones genéricas que no distinguen a nadie.',
    'Gastando dinero en algo bonito que no dice nada sobre la persona que lo recibe.',
    'La sensación de que quisiste hacer algo diferente pero no encontraste la opción.',
    'Un regalo que se agradece con educación y se guarda en un cajón.',
    'Nada que lleve el nombre de esa persona por ninguna parte.',
  ],
  afterTitle: `DESPUÉS de ${papaProductName}:`,
  after: [
    'Un delantal con el nombre de esa persona bordado a mano, hecho en Puerto Rico.',
    'Un regalo que esa persona usa de verdad todos los días que cocina.',
    'Cada vez que lo amarre, su nombre en la pechera. Cada vez que lo vea, piensa en ti.',
    'Un regalo que la gente comenta cuando visita esa cocina.',
    'Un objeto con identidad, con historia y con la marca que esa persona ya sigue y en la que confía.',
  ],
} as const;

/** Sección 15 — Comunidad */
export const papaCommunityWall = {
  title: 'Una comunidad que ya confía',
  intro: 'No tenemos que inventar números. Esto es lo que mueve El Gordito del Sabor cada mes:',
  stats: [
    `${stats.instagram} seguidores en Instagram que cocinan con nosotros todos los días.`,
    `${stats.facebook} miembros activos en Facebook con ${stats.engagementMeta} de engagement promedio, uno de los más altos del sector de cocina en Puerto Rico.`,
    `${stats.tiktok} seguidores en TikTok con ${stats.engagementTikTok} de engagement.`,
    `${stats.monthlyImpressions} de impresiones al mes. Gente real. Familias reales. Cocinas reales.`,
  ],
  closing: [
    'Esta comunidad no sigue a El Gordito del Sabor por accidente. Lo sigue porque Ariel de Valle lleva años ganándose la confianza de cada familia con recetas auténticas, sazón de verdad y amor genuino por la cocina puertorriqueña.',
    `Cuando le regalas ${papaProductName} a alguien, no le regalas solo un delantal. Le regalas un pedazo de todo eso.`,
  ],
} as const;

/** Sección 16 — Value stack */
export const papaValueStacks = [
  {
    id: 'premium' as const,
    title: 'PREMIUM',
    price: '$49.99',
    totalValue: 'más de $80',
    items: [
      { label: '1 delantal personalizado, tela 100% algodón premium con bolsillos reforzados, bordado a mano con el nombre elegido', value: '$65' },
      { label: 'Recetario digital Sabores de El Gordito con recetas exclusivas', value: '$15' },
      { label: 'Recogida en Área Metro o envío por correo', value: 'incluido' },
    ],
    closing: 'Todo eso por solo $49.99.',
  },
  {
    id: 'vip' as const,
    title: 'VIP',
    price: '$59.99',
    totalValue: 'más de $110',
    items: [
      { label: '1 delantal personalizado, tela 100% algodón premium con bolsillos reforzados, bordado a mano', value: '$65' },
      { label: 'Recetario digital Sabores de El Gordito con recetas exclusivas', value: '$15' },
      { label: 'Video exclusivo de Ariel, El Gordito del Sabor', value: '$20' },
      { label: 'Acceso al grupo privado de WhatsApp de la comunidad', value: '$10' },
      { label: 'Recogida en Área Metro o envío por correo', value: 'incluido' },
    ],
    closing: 'Todo eso por solo $59.99.',
  },
  {
    id: 'legado' as const,
    title: 'LEGADO',
    price: '$84.99',
    totalValue: 'más de $175',
    items: [
      { label: '2 delantales personalizados con nombres diferentes, tela 100% algodón premium con bolsillos reforzados, bordados a mano', value: '$130' },
      { label: 'Recetario digital Sabores de El Gordito con recetas exclusivas', value: '$15' },
      { label: 'Video exclusivo de Ariel, El Gordito del Sabor', value: '$20' },
      { label: 'Acceso al grupo privado de WhatsApp de la comunidad', value: '$10' },
      { label: 'Recogida en Área Metro o envío por correo', value: 'incluido' },
    ],
    closing: 'Todo eso por solo $84.99.',
  },
] as const;

/** Sección 18 — Quién está detrás */
export const papaBio = {
  title: 'Quién está detrás de esto',
  paragraphs: [
    'Ariel de Valle es la voz, la cara y el sazón detrás de El Gordito del Sabor, una de las comunidades de cocina más grandes y activas de Puerto Rico.',
    `Con más de ${stats.instagram} seguidores en Instagram, ${stats.facebook} en Facebook y ${stats.monthlyImpressions} de impresiones mensuales, Ariel lleva años construyendo una marca que conecta a las familias puertorriqueñas con la cocina, la tradición y el orgullo de la isla.`,
    `${papaProductName} no es un producto de temporada. Es una extensión de todo lo que El Gordito del Sabor representa: familia, sazón de verdad y amor hecho con las manos.`,
    'Hecho en Puerto Rico. Con intención. Para que quien lo recibe sepa lo que vale.',
  ],
} as const;

export const papaHomeHero = {
  eyebrow: 'El Gordito del Sabor',
  headline: 'Sazón de verdad.',
  subheadline:
    'Recetas boricuas para tu cocina, una comunidad que crece en redes, y un regalo hecho para no olvidarse.',
  ctaPrimary: 'Ver recetas',
  ctaPrimaryHref: '/recetas',
  ctaSecondary: 'Ordenar delantal',
  ctaSecondaryHref: `${papaProductSlug}#ordenar`,
} as const;

export const papaHighlights = [
  {
    title: 'Bordado a mano',
    text: 'El nombre de esa persona en la pechera — máximo 15 caracteres.',
  },
  {
    title: 'Tela premium',
    text: 'Algodón resistente al calor y las lavadas. Bolsillos reforzados.',
  },
  {
    title: 'Hecho en PR',
    text: 'Bordado y empacado con cuidado desde la isla.',
  },
  {
    title: 'Recogida o envío',
    text: 'Área Metro o correo gratis a toda Puerto Rico.',
  },
] as const;

export const papaGuaranteeSection = {
  title: 'Garantía de calidad total en el bordado',
  intro:
    'Cada delantal sale revisado por nuestro equipo antes de llegar a tus manos.',
  body: `Si recibes tu delantal con algún defecto visible en el bordado, nos escribes a ${siteConfig.email} con una foto y lo resolvemos sin costo adicional para ti. Sin complicaciones. Sin preguntas largas. Si el bordado no está perfecto, lo corregimos.`,
  delivery: `En cuanto a la entrega: si elegiste recogida en ${papaEvent.pickupLocation}, te confirmamos el punto y el horario al completar tu orden. Si elegiste envío por correo, el tiempo estimado es de ${papaEvent.mailDeliveryDays} desde que el delantal está listo.`,
} as const;

export const papaClose = {
  title: 'No dejes esto para después.',
  subtitle:
    'Las unidades son limitadas. Cada delantal se borda a mano. No hay producción en masa ni reposición inmediata garantizada. Si quieres darle a alguien un regalo que lleve su nombre, que se use de verdad y que no se olvide, este es el momento.',
  cta: 'Asegura el tuyo ahora',
  priceFrom: 'Desde $49.99',
  micro: papaCtaMicroDefault,
} as const;

export const papaDisclaimers = [
  'La satisfacción con el regalo puede variar según las expectativas individuales de cada persona.',
  'Los tiempos de entrega por correo son estimados y dependen del servicio postal.',
  `La garantía de calidad aplica a defectos visibles en el bordado notificados con evidencia fotográfica a ${siteConfig.email}.`,
  'El Gordito del Sabor no tiene afiliación con Meta, Instagram, Facebook ni TikTok. Las menciones a estas plataformas son referencias informativas sobre presencia en redes sociales.',
  'Los precios están sujetos a disponibilidad y pueden cambiar sin previo aviso una vez se agoten las unidades disponibles.',
] as const;

export const papaBundles: Record<PapaBundleId, PapaBundle> = {
  premium: {
    id: 'premium',
    title: 'Premium',
    price: 49.99,
    priceLabel: '$49.99',
    apronCount: 1,
    bullets: [
      '1 delantal personalizado con bordado a mano',
      'Recetario digital "Sabores de El Gordito"',
      'Recogida en Área Metro o envío por correo',
    ],
  },
  vip: {
    id: 'vip',
    title: 'VIP',
    price: 59.99,
    priceLabel: '$59.99',
    apronCount: 1,
    badge: 'Más popular',
    recommended: true,
    bullets: [
      '1 delantal personalizado con bordado a mano',
      'Recetario digital + video exclusivo de Ariel',
      'Acceso al grupo privado de WhatsApp',
      'Recogida en Área Metro o envío por correo',
    ],
  },
  legado: {
    id: 'legado',
    title: 'Legado',
    price: 84.99,
    priceLabel: '$84.99',
    apronCount: 2,
    badge: 'Para dos nombres',
    bullets: [
      '2 delantales personalizados (dos nombres distintos)',
      'Recetario digital + video exclusivo',
      'Acceso al grupo privado de WhatsApp',
      'Recogida en Área Metro o envío por correo',
    ],
  },
};

/** Payment Links de Stripe — cobro directo en Stripe (no API checkout). */
export function getPapaStripePaymentLink(bundleId: PapaBundleId): string | null {
  const links: Record<PapaBundleId, string | undefined> = {
    premium: process.env.NEXT_PUBLIC_STRIPE_LINK_PREMIUM,
    vip: process.env.NEXT_PUBLIC_STRIPE_LINK_VIP,
    legado: process.env.NEXT_PUBLIC_STRIPE_LINK_LEGADO,
  };
  const url = links[bundleId]?.trim();
  return url || null;
}

export function buildPapaStripeCheckoutUrl(
  bundleId: PapaBundleId,
  options: { email?: string } = {}
): string | null {
  const base = getPapaStripePaymentLink(bundleId);
  if (!base) return null;

  try {
    const url = new URL(base);
    if (options.email) {
      url.searchParams.set('prefilled_email', options.email.trim());
    }
    return url.toString();
  } catch {
    return base;
  }
}

export const papaDeliveryOptions: Record<
  PapaDeliveryMethod,
  {
    id: PapaDeliveryMethod;
    title: string;
    subtitle: string;
    recommended?: boolean;
    bullets: string[];
    warnings?: string[];
  }
> = {
  pickup: {
    id: 'pickup',
    title: 'Recogida en punto de encuentro',
    subtitle: 'Recomendado · Coordinamos contigo',
    recommended: true,
    bullets: [
      `Ubicación: ${papaEvent.pickupLocation}`,
      'Te confirmamos fecha y hora después de comprar',
      'Sin riesgo de retrasos del correo',
      'Conoces a El Gordito en persona',
    ],
  },
  mail: {
    id: 'mail',
    title: 'Envío por correo',
    subtitle: 'Comodidad en casa',
    warnings: [
      `${papaEvent.mailDeliveryDays} — sujeto a tiempos del correo postal`,
      'No recomendado si lo necesitas con urgencia',
    ],
    bullets: ['Envío gratis a toda Puerto Rico', 'Recibes en la puerta de tu casa'],
  },
};

export const papaEmbroideryExamples = [
  'MAMÁ',
  'PAPÁ',
  'CHEF CASERO',
  'JEFE DE COCINA',
] as const;

/** Sección 13 — Paso a paso */
export const papaSteps = [
  {
    step: 1,
    title: 'Elige tu oferta',
    text: 'Premium, VIP o Legado. Elige según el regalo que quieres hacer y a cuántas personas quieres honrar. La mayoría de clientes elige VIP porque el video exclusivo de Ariel y el acceso al grupo de WhatsApp convierten el delantal en una experiencia completa. Si quieres honrar a dos personas a la vez, el paquete Legado con dos delantales personalizados es la opción más poderosa.',
  },
  {
    step: 2,
    title: 'Asegura tu delantal',
    text: 'En el siguiente paso completas el nombre exacto para el bordado, eliges recogida en Área Metro o envío por correo, y pagas de forma segura con Stripe. No lo dejes para después. Las unidades son limitadas y cada pieza se hace a mano.',
  },
  {
    step: 3,
    title: 'Nosotros bordamos',
    text: `Nuestro equipo borda tu delantal a mano en ${papaEvent.embroideryTurnaround} tras confirmar la orden. Cada pieza sale revisada antes de entregarse. Si algo no está perfecto, lo corregimos antes de que lo recibas.`,
  },
  {
    step: 4,
    title: 'Tú recibes el regalo',
    text: `Si elegiste recogida: retiras en el punto designado del ${papaEvent.pickupLocation} en el horario que se te confirma al completar la orden. Si elegiste correo: el envío tarda entre ${papaEvent.mailDeliveryDays} desde que el delantal está listo. El tiempo total desde la orden hasta la entrega por correo es de aproximadamente 5 a 7 días hábiles.`,
  },
];

export const papaSocialProof = [
  {
    id: 'instagram',
    platform: 'Instagram',
    stat: stats.instagram,
    description: 'Seguidores que cocinan con nosotros todos los días.',
    href: siteConfig.instagram,
  },
  {
    id: 'facebook',
    platform: 'Facebook',
    stat: stats.facebook,
    description: `Miembros activos con ${stats.engagementMeta} de engagement promedio.`,
    href: siteConfig.facebook,
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    stat: stats.tiktok,
    description: `Seguidores con ${stats.engagementTikTok} de engagement.`,
    href: siteConfig.tiktok,
  },
] as const;

export const papaGuarantees = [
  'Garantía de calidad en el bordado',
  'Corrección sin costo si hay defecto visible',
  'Hecho en Puerto Rico con amor',
  'Pagos seguros con Stripe',
] as const;

export const papaFaqs = [
  {
    id: 'ready-time',
    question: '¿En cuánto tiempo está listo mi delantal?',
    answer: `Cada pieza se borda a mano en ${papaEvent.embroideryTurnaround} tras confirmar la orden.`,
  },
  {
    id: 'when-receive',
    question: '¿Cuándo lo recibo?',
    answer: `Si elegiste recogida en ${papaEvent.pickupLocation}: te confirmamos el punto y horario al completar la orden. Si elegiste envío por correo: ${papaEvent.mailDeliveryDays} desde que el delantal está listo. El tiempo total estimado desde la orden hasta la entrega por correo es de 5 a 7 días hábiles.`,
  },
  {
    id: 'pickup-location',
    question: '¿Dónde es la recogida?',
    answer: `El punto exacto de recogida te llega al completar tu orden. Está en el ${papaEvent.pickupLocation}.`,
  },
  {
    id: 'text',
    question: '¿Puedo poner cualquier nombre o texto en el bordado?',
    answer: `Sí. En el siguiente paso al ordenar nos das exactamente lo que quieres bordar. Máximo ${papaEvent.maxEmbroideryChars} caracteres por delantal.`,
  },
  {
    id: 'two-names',
    question: '¿Puedo pedir dos delantales con nombres diferentes?',
    answer: 'Sí. El paquete Legado incluye dos delantales personalizados con nombres distintos.',
  },
  {
    id: 'change-name',
    question: '¿Qué pasa si necesito cambiar el nombre después de ordenar?',
    answer: `Escríbenos a ${siteConfig.email} antes de que la pieza entre a producción.`,
  },
  {
    id: 'stock',
    question: '¿Por qué unidades limitadas?',
    answer: 'Porque cada delantal se borda a mano. No somos una fábrica. El límite existe para garantizar que cada pieza tenga el cuidado que merece.',
  },
  {
    id: 'payment',
    question: '¿El pago es seguro?',
    answer: 'Sí. Procesamos todos los pagos con Stripe, uno de los procesadores de pago más seguros y confiables del mundo.',
  },
  {
    id: 'support',
    question: '¿Hay soporte si tengo dudas?',
    answer: `Sí. Puedes escribirnos a ${siteConfig.email} o a ${siteConfig.supportEmail}, o unirte al grupo de WhatsApp disponible en la página.`,
  },
];

export function getBundle(id: PapaBundleId): PapaBundle {
  return papaBundles[id];
}

export function getDeliveryLabel(method: PapaDeliveryMethod): string {
  return method === 'pickup' ? 'Recogida Área Metro' : 'Envío por correo';
}

export function validateEmbroideryNames(bundleId: PapaBundleId, names: string[]): string | null {
  const bundle = getBundle(bundleId);
  if (names.length !== bundle.apronCount) {
    return bundle.apronCount === 1
      ? 'Escribe el nombre a bordar.'
      : 'Escribe los dos nombres a bordar.';
  }

  for (const name of names) {
    const trimmed = name.trim();
    if (!trimmed) return 'El nombre no puede estar vacío.';
    if (trimmed.length > papaEvent.maxEmbroideryChars) {
      return `Máximo ${papaEvent.maxEmbroideryChars} caracteres por nombre.`;
    }
  }

  return null;
}

export function validateDeliveryMethod(method: string | undefined): method is PapaDeliveryMethod {
  return method === 'pickup' || method === 'mail';
}
