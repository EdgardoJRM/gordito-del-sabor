# 🖼️ Guía de Imágenes y Multimedia

## Agregar Imágenes Reales

### Opción 1: Usar Imágenes Locales

1. **Coloca las imágenes en `public/images/`**
   ```
   public/
   └── images/
       ├── recipes/
       │   ├── mofongo.jpg
       │   ├── arroz-gandules.jpg
       │   └── ...
       ├── team/
       │   ├── gordito.jpg
       │   └── ...
       └── hero.jpg
   ```

2. **Usa Next.js Image Component**
   ```typescript
   import Image from 'next/image';

   export default function RecipeCard() {
     return (
       <Image
         src="/images/recipes/mofongo.jpg"
         alt="Mofongo Tradicional"
         width={400}
         height={300}
         priority
       />
     );
   }
   ```

### Opción 2: Usar URLs Externas

```typescript
import Image from 'next/image';

export default function RecipeCard() {
  return (
    <Image
      src="https://example.com/mofongo.jpg"
      alt="Mofongo Tradicional"
      width={400}
      height={300}
    />
  );
}
```

## Fuentes de Imágenes Gratuitas

### Bancos de Imágenes Gratuitos
- **Unsplash**: https://unsplash.com (búsqueda: "puerto rico food", "caribbean cuisine")
- **Pexels**: https://pexels.com
- **Pixabay**: https://pixabay.com
- **Freepik**: https://freepik.com (algunas gratis)

### Búsquedas Recomendadas
- "mofongo puerto rico"
- "caribbean food"
- "puerto rican cuisine"
- "comida criolla"
- "recetas puertorriqueñas"

## Optimización de Imágenes

### Tamaños Recomendados
- **Hero Image**: 1200x600px
- **Recipe Card**: 400x300px
- **Team Photo**: 300x300px
- **Thumbnail**: 200x200px

### Formatos
- **JPEG**: Para fotos (mejor compresión)
- **PNG**: Para gráficos (sin pérdida)
- **WebP**: Para web (mejor rendimiento)

### Herramientas de Optimización
- **TinyPNG**: https://tinypng.com
- **ImageOptim**: https://imageoptim.com
- **Squoosh**: https://squoosh.app

## Agregar Favicon

1. **Crea un favicon** (32x32px)
   - Usa https://favicon.io
   - O descarga uno de https://www.favicon-generator.org

2. **Coloca en `public/`**
   ```
   public/
   └── favicon.ico
   ```

3. **Ya está configurado en `app/layout.tsx`**

## Agregar Logo

1. **Crea un logo** (SVG recomendado)
   - Usa Figma, Canva o Adobe Express
   - Tamaño: 200x200px mínimo

2. **Coloca en `public/images/`**
   ```
   public/images/logo.svg
   ```

3. **Usa en Navbar**
   ```typescript
   import Image from 'next/image';

   export default function Navbar() {
     return (
       <Image
         src="/images/logo.svg"
         alt="El Gordito del Sabor"
         width={50}
         height={50}
       />
     );
   }
   ```

## Agregar Videos

### Opción 1: YouTube

```typescript
export default function RecipeVideo() {
  return (
    <div className="aspect-video">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="Receta"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
```

### Opción 2: Vimeo

```typescript
export default function RecipeVideo() {
  return (
    <div className="aspect-video">
      <iframe
        src="https://player.vimeo.com/video/VIDEO_ID"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
```

## Agregar Galería de Imágenes

```typescript
'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function RecipeGallery() {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    '/images/recipes/mofongo-1.jpg',
    '/images/recipes/mofongo-2.jpg',
    '/images/recipes/mofongo-3.jpg',
  ];

  return (
    <div>
      <div className="mb-4">
        <Image
          src={images[selectedImage]}
          alt="Receta"
          width={600}
          height={400}
        />
      </div>
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`border-2 ${
              selectedImage === index ? 'border-amber-600' : 'border-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index}`}
              width={100}
              height={100}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
```

## Reemplazar Emojis por Imágenes

### Antes (con emoji)
```typescript
<div className="text-6xl">🍌</div>
```

### Después (con imagen)
```typescript
import Image from 'next/image';

<Image
  src="/images/recipes/platano.jpg"
  alt="Plátano"
  width={200}
  height={200}
/>
```

## Agregar Open Graph Images

Para que el sitio se vea bien cuando se comparte en redes sociales:

1. **Crea una imagen 1200x630px**
2. **Coloca en `public/og-image.jpg`**
3. **Ya está configurada en `lib/metadata.ts`**

## Checklist de Imágenes

- [ ] Agregar imágenes de recetas
- [ ] Agregar fotos del equipo
- [ ] Agregar logo
- [ ] Agregar favicon
- [ ] Agregar Open Graph image
- [ ] Optimizar todas las imágenes
- [ ] Agregar videos de YouTube
- [ ] Crear galería de imágenes

## Rendimiento

### Verificar Rendimiento
- **Google PageSpeed**: https://pagespeed.web.dev
- **GTmetrix**: https://gtmetrix.com
- **WebPageTest**: https://webpagetest.org

### Tips de Rendimiento
- Usa Next.js Image para optimización automática
- Comprime imágenes antes de subir
- Usa WebP cuando sea posible
- Lazy load imágenes que no están en viewport
- Usa srcset para diferentes tamaños

---

¡Con imágenes reales, tu sitio será aún más profesional! 📸
