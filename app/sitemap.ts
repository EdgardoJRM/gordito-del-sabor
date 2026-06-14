import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gorditodelsabor.com';

  const routes = [
    '',
    '/recetas',
    '/categorias',
    '/sobre-nosotros',
    '/contacto',
    '/recetario',
    '/el-sabor-de-papa',
    '/delantal',
    '/la-boveda',
    '/las-20-recetas-favoritas',
    '/patrocinadores',
    '/preguntas',
    '/privacidad',
    '/terminos',
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'weekly',
    priority: path === '' ? 1 : path === '/recetario' ? 0.95 : 0.8,
  }));
}
