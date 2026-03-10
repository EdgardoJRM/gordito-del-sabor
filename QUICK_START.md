# 📋 Instrucciones Rápidas

## 🚀 Iniciar el Servidor de Desarrollo

```bash
cd /Users/gardo/gordito-del-sabor
npm run dev
```

Luego abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura de Carpetas

```
gordito-del-sabor/
├── app/                    # Páginas y rutas
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── globals.css        # Estilos globales
│   ├── recetas/           # Sección de recetas
│   ├── categorias/        # Sección de categorías
│   ├── sobre-nosotros/    # Página de nosotros
│   ├── contacto/          # Página de contacto
│   └── tienda/            # Página de tienda
├── components/            # Componentes reutilizables
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── FeaturedRecipes.tsx
│   ├── Categories.tsx
│   ├── Newsletter.tsx
│   └── About.tsx
├── public/                # Imágenes y assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── README.md              # Documentación principal
├── DEPLOYMENT.md          # Guía de despliegue
└── QUICK_START.md         # Este archivo
```

## 🎨 Personalización

### Cambiar Colores
Edita `app/globals.css` y busca `:root`:

```css
:root {
  --color-primary: #d4a574;      /* Dorado */
  --color-primary-dark: #b8860b; /* Dorado oscuro */
  --color-secondary: #2c1810;    /* Marrón */
  --color-accent: #e8d4c4;       /* Crema */
  --color-light: #f5f1ed;        /* Blanco roto */
}
```

### Agregar Nueva Página
1. Crea una carpeta en `app/` (ej: `app/blog/`)
2. Crea un archivo `page.tsx` dentro
3. Agrega el contenido con TypeScript/React

Ejemplo:
```typescript
export default function BlogPage() {
  return (
    <main>
      <h1>Mi Blog</h1>
    </main>
  );
}
```

### Agregar Nueva Receta
1. Edita `components/FeaturedRecipes.tsx` o `app/recetas/page.tsx`
2. Agrega un nuevo objeto a la lista de recetas
3. Crea una página de detalle en `app/recetas/[id]/page.tsx`

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

## 📱 Responsive Design

El sitio está optimizado para:
- 📱 Móvil (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

Usa `md:` y `lg:` en Tailwind para breakpoints.

## 🎯 Próximos Pasos

1. **Agregar imágenes reales**: Reemplaza los emojis con imágenes en `public/`
2. **Integrar base de datos**: Usa Supabase o Firebase para recetas dinámicas
3. **Agregar búsqueda**: Implementa búsqueda de recetas
4. **Integrar redes sociales**: Agrega botones de compartir
5. **Agregar comentarios**: Permite que usuarios comenten en recetas

## 🆘 Ayuda

- **Documentación Next.js**: https://nextjs.org/docs
- **Documentación Tailwind**: https://tailwindcss.com/docs
- **Documentación TypeScript**: https://www.typescriptlang.org/docs

## 📞 Soporte

Para preguntas sobre el código, revisa:
1. Los comentarios en el código
2. La documentación de Next.js
3. Los ejemplos en el proyecto

---

¡Feliz desarrollo! 🎉
