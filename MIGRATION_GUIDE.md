# 📸 Guía: Importar Imágenes y Contenido de gorditodelsabor.com

## 🎯 Objetivo

Migrar todas las imágenes y contenido de la página web antigua (https://gorditodelsabor.com) a tu nuevo sitio profesional.

## 📁 Estructura de Directorios Creada

```
public/images/
├── recipes/          # Imágenes de recetas
├── hero/             # Imágenes del hero section
└── team/             # Fotos del equipo
```

## 🔍 Paso 1: Identificar las Imágenes en el Sitio Antiguo

### Método 1: Usar DevTools del Navegador

1. Ve a https://gorditodelsabor.com
2. Abre DevTools (F12 o Cmd+Option+I)
3. Ve a la pestaña "Network"
4. Recarga la página
5. Filtra por "img" para ver todas las imágenes
6. Haz clic derecho en cada imagen → "Copy image link"

### Método 2: Inspeccionar el HTML

1. Ve a https://gorditodelsabor.com
2. Abre DevTools (F12)
3. Ve a la pestaña "Elements"
4. Busca etiquetas `<img>` para encontrar las URLs de las imágenes

## 📥 Paso 2: Descargar las Imágenes

### Opción A: Descargar Manualmente

1. Haz clic derecho en cada imagen
2. Selecciona "Guardar imagen como..."
3. Guarda en la carpeta correspondiente:
   - Recetas → `public/images/recipes/`
   - Hero → `public/images/hero/`
   - Equipo → `public/images/team/`

### Opción B: Usar Script de Descarga

Si tienes las URLs de las imágenes, puedes usar este script:

```bash
#!/bin/bash

# Descargar imágenes
cd /Users/gardo/gordito-del-sabor/public/images/recipes

# Ejemplo: descargar una imagen
# curl -o mofongo.jpg "https://ejemplo.com/mofongo.jpg"

# Reemplaza las URLs con las reales del sitio antiguo
```

## 📝 Paso 3: Actualizar el Contenido

### Recetas

Edita `app/recetas/page.tsx` y `components/FeaturedRecipes.tsx`:

```typescript
const allRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Mofongo Tradicional',
    category: 'Comida Criolla',
    difficulty: 'Fácil',
    time: '20 min',
    servings: '4',
    emoji: '🍌',
    description: 'El clásico puertorriqueño con plátanos verdes, ajo y chicharrón.',
    image: '/images/recipes/mofongo.jpg', // Agregar esta línea
  },
  // ... más recetas
];
```

### Actualizar Componentes para Mostrar Imágenes

Edita `components/FeaturedRecipes.tsx`:

```typescript
import Image from 'next/image';

export default function FeaturedRecipes() {
  return (
    <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
      {recipe.image ? (
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-6xl">{recipe.emoji}</span>
      )}
    </div>
  );
}
```

## 🍳 Paso 4: Agregar Recetas del Sitio Antiguo

Basándome en el contenido del sitio antiguo, aquí están las recetas que debes agregar:

### Recetas de Temporada

1. **Pechuga de Pavo Rellena**
   - Categoría: Comida Criolla
   - Descripción: "Esta pechuga de pavo rellena es tremenda alternativa, muy saludable y fácil para los que no deseen hacer un pavo entero."

2. **Pavo Horneado**
   - Categoría: Comida Criolla
   - Descripción: "Este pavo queda bello. Sirva con arroz con gandules, morcilla, pasteles con lo que quieras."

### Categorías del Sitio Antiguo

- Comida Criolla
- Gluten Free
- Carnes
- Air Fryer
- Marisco
- Empanados
- Pastas

## 🔄 Paso 5: Actualizar la Base de Datos de Recetas

Crea un archivo `lib/recipes.ts` con todas las recetas:

```typescript
export const recipes = [
  {
    id: '1',
    title: 'Pechuga de Pavo Rellena',
    category: 'Comida Criolla',
    difficulty: 'Medio',
    time: '90 min',
    servings: '6',
    image: '/images/recipes/pechuga-pavo.jpg',
    description: 'Esta pechuga de pavo rellena es tremenda alternativa, muy saludable y fácil para los que no deseen hacer un pavo entero.',
    ingredients: [
      '1 pechuga de pavo de 2-3 lbs',
      'Relleno a tu gusto',
      'Aceite de oliva',
      'Sal y pimienta',
    ],
    instructions: [
      'Precalienta el horno a 350°F',
      'Prepara el relleno',
      'Rellena la pechuga',
      'Hornea por 60-90 minutos',
    ],
  },
  // ... más recetas
];
```

## 🖼️ Paso 6: Agregar Imágenes del Hero

Edita `components/Hero.tsx`:

```typescript
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-96 lg:h-full min-h-96">
      <Image
        src="/images/hero/hero-image.jpg"
        alt="El Gordito del Sabor"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
```

## 👥 Paso 7: Agregar Fotos del Equipo

Edita `app/sobre-nosotros/page.tsx`:

```typescript
import Image from 'next/image';

export default function AboutPage() {
  const team = [
    {
      name: 'El Gordito',
      role: 'Chef Fundador',
      image: '/images/team/gordito.jpg',
    },
    // ... más miembros del equipo
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {team.map((member) => (
        <div key={member.name}>
          <Image
            src={member.image}
            alt={member.name}
            width={300}
            height={300}
            className="rounded-xl mb-4"
          />
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
      ))}
    </div>
  );
}
```

## 📋 Checklist de Migración

- [ ] Descargar todas las imágenes del sitio antiguo
- [ ] Organizar imágenes en carpetas (`recipes/`, `hero/`, `team/`)
- [ ] Actualizar `components/FeaturedRecipes.tsx` para mostrar imágenes
- [ ] Agregar todas las recetas del sitio antiguo
- [ ] Agregar fotos del equipo
- [ ] Actualizar el hero section con imagen
- [ ] Optimizar imágenes (comprimir)
- [ ] Probar que todas las imágenes se carguen correctamente

## 🎨 Optimización de Imágenes

### Comprimir Imágenes

Usa herramientas gratuitas:
- **TinyPNG**: https://tinypng.com
- **Squoosh**: https://squoosh.app
- **ImageOptim**: https://imageoptim.com

### Tamaños Recomendados

- **Recetas**: 400x300px (JPEG)
- **Hero**: 1200x600px (JPEG)
- **Equipo**: 300x300px (JPEG)

## 🚀 Paso 8: Probar Localmente

```bash
cd /Users/gardo/gordito-del-sabor
npm run dev
```

Abre http://localhost:3000 y verifica que todas las imágenes se carguen correctamente.

## 📊 Contenido del Sitio Antiguo a Migrar

### Secciones Principales
- ✅ Inicio
- ✅ Recetas (con categorías)
- ✅ Tienda
- ✅ Sobre Nosotros
- ✅ Newsletter

### Categorías
- ✅ Comida Criolla
- ✅ Gluten Free
- ✅ Carnes
- ✅ Air Fryer
- ✅ Marisco
- ✅ Empanados
- ✅ Pastas

### Recetas Identificadas
- ✅ Pechuga de Pavo Rellena
- ✅ Pavo Horneado
- (Agregar más según encuentres en el sitio)

## 💡 Consejos

1. **Usa DevTools**: Es la forma más fácil de encontrar todas las imágenes
2. **Organiza bien**: Mantén las imágenes organizadas por categoría
3. **Optimiza**: Comprime las imágenes antes de subirlas
4. **Prueba**: Verifica que todo funcione localmente antes de desplegar
5. **Backup**: Guarda copias de las imágenes originales

## 🆘 Problemas Comunes

### Las imágenes no se cargan
- Verifica que el archivo esté en la carpeta correcta
- Verifica que la ruta sea correcta (case-sensitive)
- Verifica que el archivo tenga la extensión correcta

### Las imágenes se ven pixeladas
- Comprime las imágenes
- Usa un tamaño más grande
- Usa formato WebP en lugar de JPEG

### El sitio es lento
- Optimiza las imágenes
- Usa Next.js Image component
- Implementa lazy loading

---

¡Listo! Ahora tienes una guía completa para migrar todas las imágenes y contenido del sitio antiguo.
