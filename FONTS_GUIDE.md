# 🎨 FONTS DISPONIBLES

Se han agregado 4 nuevos fonts modernos a tu proyecto. Aquí está cómo usarlos:

## Fonts Instalados

### 1. **Playfair Display** (Ya existente)
- Elegante y sofisticado
- Perfecto para títulos principales
- Uso: `font-playfair`

```jsx
<h1 className="font-playfair text-4xl">Título Principal</h1>
```

### 2. **Montserrat** (Nuevo)
- Moderno y limpio
- Versátil para cualquier uso
- Uso: `font-montserrat`

```jsx
<h2 className="font-montserrat text-2xl font-bold">Subtítulo</h2>
```

### 3. **Poppins** (Nuevo)
- Contemporáneo y amigable
- Excelente para botones y CTA
- Uso: `font-poppins`

```jsx
<button className="font-poppins font-semibold">Botón</button>
```

### 4. **Lora** (Nuevo)
- Elegante y legible
- Perfecto para párrafos largos
- Uso: `font-lora`

```jsx
<p className="font-lora text-lg">Párrafo de contenido...</p>
```

### 5. **Inter** (Por defecto)
- Limpio y moderno
- Se usa por defecto en todo el sitio
- Uso: `font-sans` (por defecto)

## Ejemplos de Uso

### Combinación Recomendada

```jsx
// Títulos principales
<h1 className="font-playfair text-5xl font-bold">El Gordito del Sabor</h1>

// Subtítulos
<h2 className="font-montserrat text-3xl font-bold">Recetas Auténticas</h2>

// Secciones
<h3 className="font-poppins text-xl font-semibold">Ingredientes</h3>

// Contenido
<p className="font-lora text-base leading-relaxed">
  Descripción detallada de la receta...
</p>

// Botones
<button className="font-poppins font-bold px-6 py-3">
  Explorar Recetas
</button>
```

## Cómo Usar en Componentes

### Ejemplo 1: Componente de Receta

```jsx
export default function RecipeCard() {
  return (
    <div>
      <h2 className="font-montserrat text-2xl font-bold text-amber-900">
        Mofongo Tradicional
      </h2>
      <p className="font-lora text-gray-700 mt-2">
        El clásico puertorriqueño con plátanos verdes...
      </p>
      <button className="font-poppins font-semibold mt-4">
        Ver Receta
      </button>
    </div>
  );
}
```

### Ejemplo 2: Página de Tienda

```jsx
export default function StorePage() {
  return (
    <div>
      <h1 className="font-playfair text-5xl text-amber-900">
        Tienda de Delantales
      </h1>
      <h2 className="font-poppins text-2xl font-bold mt-8">
        Delantales Personalizados
      </h2>
      <p className="font-lora text-gray-600 mt-4">
        Crea tu delantal único con tu nombre personalizado...
      </p>
    </div>
  );
}
```

## Pesos de Font Disponibles

### Poppins
- 400 (Regular)
- 500 (Medium)
- 600 (Semibold)
- 700 (Bold)

Uso:
```jsx
<p className="font-poppins font-400">Regular</p>
<p className="font-poppins font-500">Medium</p>
<p className="font-poppins font-600">Semibold</p>
<p className="font-poppins font-700">Bold</p>
```

## Recomendaciones de Uso

### Para Títulos Principales
- Usa `font-playfair` con tamaño grande
- Ejemplo: `font-playfair text-5xl font-bold`

### Para Subtítulos
- Usa `font-montserrat` o `font-poppins`
- Ejemplo: `font-montserrat text-2xl font-bold`

### Para Botones y CTA
- Usa `font-poppins` con peso semibold o bold
- Ejemplo: `font-poppins font-semibold`

### Para Contenido Largo
- Usa `font-lora` para mejor legibilidad
- Ejemplo: `font-lora text-base leading-relaxed`

### Para Contenido General
- Usa `font-sans` (Inter por defecto)
- Ejemplo: `text-gray-700` (sin especificar font)

## Cambiar Fonts en Componentes Existentes

Si quieres cambiar los fonts en componentes existentes:

1. **Navbar**: Cambiar a `font-poppins`
2. **Hero**: Cambiar títulos a `font-playfair`
3. **Recetas**: Cambiar a `font-lora` para descripción
4. **Botones**: Cambiar a `font-poppins`

## Ejemplo Completo

```jsx
import { Montserrat, Poppins, Lora } from 'next/font/google';

export default function Page() {
  return (
    <div>
      {/* Título Principal */}
      <h1 className="font-playfair text-5xl font-bold text-amber-900 mb-4">
        El Gordito del Sabor
      </h1>

      {/* Subtítulo */}
      <h2 className="font-montserrat text-2xl font-bold text-gray-800 mb-6">
        Recetas Auténticas Puertorriqueñas
      </h2>

      {/* Descripción */}
      <p className="font-lora text-lg text-gray-700 mb-8 leading-relaxed">
        Descubre recetas auténticas puertorriqueñas, desde comida criolla 
        tradicional hasta platos gourmet. Aprende a cocinar con pasión y sabor.
      </p>

      {/* Botón */}
      <button className="font-poppins font-bold px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
        Explorar Recetas
      </button>
    </div>
  );
}
```

## Notas Importantes

- Los fonts se cargan desde Google Fonts
- Se optimizan automáticamente para web
- No afectan el rendimiento del sitio
- Son responsive y se ven bien en todos los dispositivos

---

¡Ahora tienes 4 fonts modernos disponibles para usar en tu proyecto! 🎨
