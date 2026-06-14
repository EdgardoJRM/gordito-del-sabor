/**
 * Testimonios de ejemplo — reemplaza por comentarios reales de clientes o comunidad
 * cuando tengas permiso y capturas.
 */
export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Si false, muestra aviso de “ejemplo” en UI si lo usas */
  isReal?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Las recetas están claras. En mi casa se siente sazón de verdad sin complicarme con cosas raras.',
    name: 'María R.',
    role: 'San Juan, PR',
    isReal: false,
  },
  {
    id: 't2',
    quote: 'Por fin algo que se lee bien en el celular mientras cocino. Directo al grano.',
    name: 'Carlos M.',
    role: 'Orlando, FL',
    isReal: false,
  },
  {
    id: 't3',
    quote: 'Me gusta que no sea “chef perfecto”. Se siente casa, familia y cultura.',
    name: 'Ana L.',
    role: 'Arecibo, PR',
    isReal: false,
  },
];
