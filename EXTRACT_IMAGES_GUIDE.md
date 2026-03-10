# 🎬 Guía Visual: Extraer Imágenes de gorditodelsabor.com

## 📸 Método Más Fácil: Usar DevTools

### Paso 1: Abre el Sitio Antiguo

1. Ve a https://gorditodelsabor.com en tu navegador
2. Espera a que cargue completamente

### Paso 2: Abre DevTools

**En Chrome/Edge:**
- Presiona `F12` o `Ctrl+Shift+I` (Windows)
- Presiona `Cmd+Option+I` (Mac)

**En Firefox:**
- Presiona `F12` o `Ctrl+Shift+I` (Windows)
- Presiona `Cmd+Option+I` (Mac)

### Paso 3: Ve a la Pestaña Network

1. En DevTools, haz clic en la pestaña "Network"
2. Recarga la página (F5 o Cmd+R)
3. Espera a que cargue todo

### Paso 4: Filtra por Imágenes

1. En el filtro de Network, escribe "img" o "image"
2. Verás todas las imágenes que se cargaron
3. Haz clic en cada una para ver la URL

### Paso 5: Descarga las Imágenes

**Opción A: Descargar Manualmente**

1. Haz clic derecho en la imagen en el navegador
2. Selecciona "Guardar imagen como..."
3. Elige la carpeta de destino
4. Guarda con un nombre descriptivo

**Opción B: Copiar URL y Descargar con curl**

1. Haz clic derecho en la imagen
2. Selecciona "Copiar enlace de imagen"
3. Abre Terminal
4. Ejecuta:

```bash
cd /Users/gardo/gordito-del-sabor/public/images/recipes
curl -o nombre-imagen.jpg "URL_QUE_COPIASTE"
```

## 🔍 Método Alternativo: Inspeccionar HTML

### Paso 1: Abre DevTools

Presiona `F12` o `Cmd+Option+I`

### Paso 2: Ve a la Pestaña Elements/Inspector

1. Haz clic en la pestaña "Elements" (Chrome) o "Inspector" (Firefox)
2. Presiona `Ctrl+F` o `Cmd+F` para buscar
3. Busca `<img` para encontrar todas las imágenes

### Paso 3: Encuentra las URLs

Busca líneas como:
```html
<img src="https://ejemplo.com/imagen.jpg" alt="Descripción">
```

### Paso 4: Descarga

Copia la URL y descarga con curl:

```bash
curl -o nombre.jpg "https://ejemplo.com/imagen.jpg"
```

## 📁 Estructura de Carpetas

Después de descargar, organiza así:

```
public/images/
├── recipes/
│   ├── mofongo.jpg
│   ├── arroz-gandules.jpg
│   ├── tostones.jpg
│   ├── alcapurrias.jpg
│   ├── ceviche.jpg
│   ├── pernil.jpg
│   ├── pechuga-pavo.jpg
│   └── pavo-horneado.jpg
├── hero/
│   └── hero-image.jpg
└── team/
    ├── gordito.jpg
    ├── maria.jpg
    └── carlos.jpg
```

## 🎯 Imágenes a Buscar

Basándome en el sitio antiguo, busca estas imágenes:

### Recetas Principales
- [ ] Pechuga de Pavo Rellena
- [ ] Pavo Horneado
- [ ] Mofongo
- [ ] Arroz con Gandules
- [ ] Tostones
- [ ] Alcapurrias
- [ ] Ceviche
- [ ] Pernil

### Imágenes del Sitio
- [ ] Logo de El Gordito del Sabor
- [ ] Imagen del hero section
- [ ] Fotos del equipo
- [ ] Imágenes de categorías

## 💾 Guardar Imágenes

### Paso 1: Crea la Carpeta

```bash
mkdir -p /Users/gardo/gordito-del-sabor/public/images/recipes
mkdir -p /Users/gardo/gordito-del-sabor/public/images/hero
mkdir -p /Users/gardo/gordito-del-sabor/public/images/team
```

### Paso 2: Descarga las Imágenes

```bash
# Ejemplo: descargar una imagen
cd /Users/gardo/gordito-del-sabor/public/images/recipes
curl -o mofongo.jpg "https://gorditodelsabor.com/images/mofongo.jpg"
```

### Paso 3: Verifica

```bash
ls -la /Users/gardo/gordito-del-sabor/public/images/recipes/
```

## 🖼️ Actualizar el Código

Una vez que tengas las imágenes, actualiza los componentes:

### Ejemplo: FeaturedRecipes.tsx

```typescript
import Image from 'next/image';

const recipes = [
  {
    id: '1',
    title: 'Mofongo',
    image: '/images/recipes/mofongo.jpg',
    // ... otros datos
  },
];

export default function FeaturedRecipes() {
  return (
    <Image
      src={recipe.image}
      alt={recipe.title}
      width={400}
      height={300}
    />
  );
}
```

## ✅ Checklist

- [ ] Abrí DevTools
- [ ] Filtré por imágenes
- [ ] Copié las URLs
- [ ] Descargué las imágenes
- [ ] Organicé en carpetas
- [ ] Actualicé el código
- [ ] Probé localmente

## 🆘 Problemas Comunes

### "No veo las imágenes en DevTools"
- Asegúrate de estar en la pestaña "Network"
- Recarga la página después de abrir DevTools
- Filtra por "img" o "image"

### "La URL no funciona"
- Verifica que sea una URL completa (con https://)
- Algunos sitios pueden tener protección
- Intenta descargar manualmente

### "curl no funciona"
- Instala curl: `brew install curl` (Mac)
- O descarga manualmente desde el navegador

## 📞 Ayuda

Si necesitas ayuda:
1. Lee MIGRATION_GUIDE.md
2. Consulta la documentación de Next.js Image
3. Busca en Google "cómo descargar imágenes de un sitio web"

---

¡Listo! Ahora tienes todo lo que necesitas para extraer las imágenes del sitio antiguo.
