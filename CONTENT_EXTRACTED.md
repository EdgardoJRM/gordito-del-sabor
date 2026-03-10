# 📋 Contenido Extraído de gorditodelsabor.com

## 🏠 Estructura del Sitio Antiguo

### Menú Principal
- Inicio
- Recetas
  - Comida Criolla
  - Gluten Free
  - Carnes
  - Air Fryer
  - Marisco
  - Empanados
  - Pastas
- Tienda
- Sobre Nosotros

## 🍳 Recetas Identificadas

### Recetas de Temporada

#### 1. Pechuga de Pavo Rellena
- **Categoría**: Comida Criolla
- **Descripción**: "Esta pechuga de pavo rellena es tremenda alternativa, muy saludable y fácil para los que no deseen hacer un pavo entero."
- **Dificultad**: Medio
- **Tiempo**: 90 minutos
- **Porciones**: 6

#### 2. Pavo Horneado
- **Categoría**: Comida Criolla
- **Descripción**: "Este pavo queda bello. Sirva con arroz con gandules, morcilla, pasteles con lo que quieras. Y si te sobra, al otro día te preparas un sándwich de pavo. Yo lo acompañé con un vino blanco. Tú con lo que más te guste. ¡Esto es Bello!"
- **Dificultad**: Medio
- **Tiempo**: 120 minutos
- **Porciones**: 8

## 🏷️ Categorías del Sitio

1. **Comida Criolla** - Recetas tradicionales puertorriqueñas
2. **Gluten Free** - Opciones sin gluten
3. **Carnes** - Preparaciones con carne
4. **Air Fryer** - Recetas en freidora de aire
5. **Marisco** - Platos con pescado y mariscos
6. **Empanados** - Empanadas y fritos
7. **Pastas** - Platos con pasta

## 🛒 Tienda

- **Descripción**: "Explora ingredientes de calidad para darle a tu cocina el auténtico toque de sabor que solo El Gordito puede ofrecer. ¡Haz de cada plato una experiencia memorable!"
- **Integración**: Amazon (según el sitio antiguo)

## 📧 Newsletter

- **Título**: "Mantente conectado con nosotros"
- **Descripción**: "Suscríbete para recibir noticias sobre promociones, ofertas y eventos."
- **Campo**: Correo electrónico
- **Botón**: Registrarse

## 📄 Pie de Página

- **Copyright**: "Copyright © 2024 El Gordito del Sabor - Todos los derechos reservados."
- **Enlaces**:
  - Política de privacidad
  - Términos y condiciones
- **Tecnología**: "Con tecnología de GoDaddy"
- **Cookies**: Aviso de cookies

## 🎨 Elementos Visuales

### Galería de Recetas
- Sección de galería de recetas
- Imágenes de recetas destacadas

### Tienda de Amazon
- Enlace a tienda de Amazon
- Botón "Acceder"

## 📱 Información de Contacto

Basándome en el sitio antiguo, el sitio tiene:
- Formulario de contacto
- Suscripción a newsletter
- Enlaces a redes sociales

## 🔄 Cómo Usar Este Contenido

### 1. Actualizar Recetas

Edita `lib/recipes.ts` o `components/FeaturedRecipes.tsx`:

```typescript
const recipes = [
  {
    id: '1',
    title: 'Pechuga de Pavo Rellena',
    category: 'Comida Criolla',
    difficulty: 'Medio',
    time: '90 min',
    servings: '6',
    description: 'Esta pechuga de pavo rellena es tremenda alternativa, muy saludable y fácil para los que no deseen hacer un pavo entero.',
    image: '/images/recipes/pechuga-pavo.jpg',
  },
  {
    id: '2',
    title: 'Pavo Horneado',
    category: 'Comida Criolla',
    difficulty: 'Medio',
    time: '120 min',
    servings: '8',
    description: 'Este pavo queda bello. Sirva con arroz con gandules, morcilla, pasteles con lo que quieras.',
    image: '/images/recipes/pavo-horneado.jpg',
  },
];
```

### 2. Actualizar Categorías

Las categorías ya están en tu nuevo sitio, pero puedes agregar más recetas a cada una.

### 3. Actualizar Tienda

Edita `app/tienda/page.tsx` para agregar productos reales de Amazon.

### 4. Actualizar Newsletter

El componente Newsletter ya está implementado en `components/Newsletter.tsx`.

## 📊 Comparación: Antiguo vs Nuevo

| Aspecto | Sitio Antiguo | Nuevo Sitio |
|---------|---------------|------------|
| Diseño | Básico | Moderno |
| Recetas | Pocas | Muchas |
| Categorías | 7 | 6+ |
| Tienda | Amazon | Preparada |
| Newsletter | Sí | Sí |
| Responsive | Limitado | Perfecto |
| SEO | Básico | Optimizado |

## 🎯 Próximos Pasos

1. **Descargar imágenes** - Ver EXTRACT_IMAGES_GUIDE.md
2. **Agregar recetas** - Actualizar components/FeaturedRecipes.tsx
3. **Actualizar categorías** - Agregar más recetas a cada categoría
4. **Integrar tienda** - Conectar con Amazon o tu proveedor
5. **Probar** - Verificar que todo funcione localmente
6. **Desplegar** - Subir a Vercel

## 📝 Notas

- El sitio antiguo usa GoDaddy como hosting
- Tiene integración con Amazon para la tienda
- Usa un sistema de cookies
- Tiene política de privacidad y términos

## 🔗 Referencias

- Sitio antiguo: https://gorditodelsabor.com
- Nuevo sitio (local): http://localhost:3000
- Documentación: MIGRATION_GUIDE.md, EXTRACT_IMAGES_GUIDE.md

---

¡Listo! Ahora tienes todo el contenido del sitio antiguo documentado y listo para migrar.
