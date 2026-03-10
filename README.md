# El Gordito del Sabor - Sitio Web Profesional

Una página web moderna y profesional para El Gordito del Sabor, especializada en recetas auténticas puertorriqueñas.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y atractiva con Tailwind CSS
- **Responsive**: Perfectamente optimizado para móvil, tablet y desktop
- **SEO Optimizado**: Metadatos y estructura semántica para mejor posicionamiento
- **Rápido**: Construido con Next.js 16 para máximo rendimiento
- **Componentes Reutilizables**: Arquitectura escalable y mantenible
- **Recetas Detalladas**: Páginas completas con ingredientes, instrucciones y consejos
- **Newsletter**: Sistema de suscripción para mantener conectados a los usuarios
- **Categorías**: Organización de recetas por tipo (Comida Criolla, Carnes, Marisco, etc.)

## 📋 Páginas Incluidas

- **Inicio**: Hero section con recetas destacadas y categorías
- **Recetas**: Catálogo completo de recetas
- **Detalle de Receta**: Página completa con ingredientes, pasos y consejos
- **Categorías**: Exploración por tipo de receta
- **Sobre Nosotros**: Historia y valores de la marca
- **Contacto**: Formulario de contacto y información
- **Newsletter**: Suscripción a actualizaciones

## 🛠️ Tecnologías

- **Next.js 16**: Framework React moderno
- **TypeScript**: Tipado estático para mayor seguridad
- **Tailwind CSS 4**: Estilos modernos y responsive
- **Lucide React**: Iconos profesionales
- **Vercel**: Hosting optimizado para Next.js

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 🌐 Despliegue en Vercel

1. Sube el proyecto a GitHub
2. Conecta tu repositorio en [Vercel](https://vercel.com)
3. Configura tu dominio de GoDaddy en Vercel
4. ¡Listo! Tu sitio estará en línea

### Pasos para conectar dominio GoDaddy:

1. En Vercel, ve a Settings → Domains
2. Agrega tu dominio `gorditodelsabor.com`
3. En GoDaddy, actualiza los nameservers a los de Vercel
4. Espera 24-48 horas para que se propague

## 📱 Estructura del Proyecto

```
gordito-del-sabor/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página de inicio
│   ├── globals.css         # Estilos globales
│   ├── recetas/
│   │   ├── page.tsx        # Listado de recetas
│   │   └── [id]/
│   │       └── page.tsx    # Detalle de receta
│   ├── sobre-nosotros/
│   │   └── page.tsx
│   └── contacto/
│       └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── FeaturedRecipes.tsx
│   ├── Categories.tsx
│   ├── Newsletter.tsx
│   └── About.tsx
├── public/                 # Imágenes y assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎨 Personalización

### Colores
Los colores principales están definidos en `app/globals.css`:
- Primary: `#d4a574` (Dorado)
- Secondary: `#2c1810` (Marrón oscuro)
- Accent: `#e8d4c4` (Crema)

### Fuentes
- **Playfair Display**: Para títulos elegantes
- **Inter**: Para cuerpo de texto

## 📝 Próximos Pasos

- [ ] Agregar imágenes reales de recetas
- [ ] Integrar sistema de comentarios
- [ ] Agregar búsqueda de recetas
- [ ] Implementar sistema de favoritos
- [ ] Agregar videos de recetas
- [ ] Integrar con redes sociales
- [ ] Agregar blog de consejos culinarios

## 📧 Contacto

Para preguntas o sugerencias, contacta a través del formulario en la página de contacto.

## 📄 Licencia

Todos los derechos reservados © 2024 El Gordito del Sabor
