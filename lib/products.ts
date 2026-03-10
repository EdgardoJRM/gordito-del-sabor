export interface ApronProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  features: string[];
}

export const apronProducts: ApronProduct[] = [
  {
    id: 'basic-apron',
    name: 'Delantal Básico',
    price: 19.99,
    description: 'Delantal clásico de algodón con bolsillo frontal. Perfecto para comenzar tu aventura culinaria.',
    image: '👕',
    features: [
      'Algodón 100%',
      'Bolsillo frontal',
      'Ajuste regulable',
      'Personalización incluida'
    ]
  },
  {
    id: 'standard-apron',
    name: 'Delantal Estándar',
    price: 29.99,
    description: 'Delantal de calidad premium con dos bolsillos y refuerzo en la cintura. Ideal para uso frecuente.',
    image: '👔',
    features: [
      'Algodón premium',
      'Dos bolsillos',
      'Refuerzo en cintura',
      'Personalización incluida',
      'Más durabilidad'
    ]
  },
  {
    id: 'premium-apron',
    name: 'Delantal Premium Canvas',
    price: 39.99,
    description: 'Delantal profesional de lona gruesa con múltiples bolsillos. Para chefs serios.',
    image: '🎨',
    features: [
      'Lona gruesa 100%',
      'Tres bolsillos',
      'Refuerzo profesional',
      'Personalización incluida',
      'Máxima durabilidad',
      'Uso profesional'
    ]
  }
];

export function getProductById(id: string): ApronProduct | undefined {
  return apronProducts.find(p => p.id === id);
}
