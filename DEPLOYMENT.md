# 🚀 Guía de Despliegue - El Gordito del Sabor

## Paso 1: Preparar el Repositorio en GitHub

### 1.1 Crear un repositorio en GitHub
1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repositorio: `gordito-del-sabor`
3. Descripción: "Sitio web profesional para El Gordito del Sabor - Recetas puertorriqueñas"
4. Selecciona "Public" (para que Vercel pueda acceder)
5. Haz clic en "Create repository"

### 1.2 Subir el código a GitHub
```bash
cd /Users/gardo/gordito-del-sabor

# Inicializar git (ya está hecho por create-next-app)
git status

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "Initial commit: Professional website for El Gordito del Sabor"

# Agregar el remote (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/gordito-del-sabor.git

# Cambiar rama a main si es necesario
git branch -M main

# Subir a GitHub
git push -u origin main
```

## Paso 2: Desplegar en Vercel

### 2.1 Conectar Vercel con GitHub
1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Sign Up" o "Log In"
3. Selecciona "Continue with GitHub"
4. Autoriza a Vercel para acceder a tu cuenta de GitHub

### 2.2 Importar el proyecto
1. En el dashboard de Vercel, haz clic en "Add New..." → "Project"
2. Busca y selecciona el repositorio `gordito-del-sabor`
3. Haz clic en "Import"

### 2.3 Configurar el proyecto
- **Framework Preset**: Next.js (se detecta automáticamente)
- **Root Directory**: ./
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

Haz clic en "Deploy"

## Paso 3: Conectar Dominio de GoDaddy

### 3.1 En Vercel
1. Ve a tu proyecto en Vercel
2. Haz clic en "Settings" → "Domains"
3. Haz clic en "Add Domain"
4. Ingresa: `gorditodelsabor.com`
5. Selecciona "Using Nameservers"
6. Copia los nameservers que Vercel proporciona

### 3.2 En GoDaddy
1. Ve a [godaddy.com](https://godaddy.com)
2. Inicia sesión en tu cuenta
3. Ve a "My Products" → "Domains"
4. Selecciona `gorditodelsabor.com`
5. Haz clic en "Manage DNS"
6. Busca la sección "Nameservers"
7. Haz clic en "Change Nameservers"
8. Selecciona "I'll use my own nameservers"
9. Reemplaza los nameservers con los de Vercel
10. Guarda los cambios

**Nota**: Los cambios pueden tardar 24-48 horas en propagarse.

## Paso 4: Verificar el Despliegue

1. Espera a que Vercel termine el build (verás un checkmark verde)
2. Haz clic en el enlace de tu proyecto en Vercel
3. Verifica que todo se vea correctamente
4. Después de 24-48 horas, accede a `gorditodelsabor.com`

## 🔄 Flujo de Actualización

Cada vez que hagas cambios:

```bash
# Hacer cambios en los archivos

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir a GitHub
git push

# Vercel se actualizará automáticamente
```

## 📊 Monitoreo

En el dashboard de Vercel puedes:
- Ver el estado del build
- Revisar logs de despliegue
- Monitorear el rendimiento
- Ver analytics del sitio

## 🆘 Solución de Problemas

### El sitio no se ve correctamente
- Limpia el caché del navegador (Ctrl+Shift+Delete)
- Espera a que el build de Vercel termine

### El dominio no funciona
- Verifica que los nameservers estén correctamente configurados en GoDaddy
- Espera 24-48 horas para que se propague
- Usa [whatsmydns.net](https://whatsmydns.net) para verificar

### Build falla en Vercel
- Revisa los logs en Vercel
- Asegúrate de que `npm install` funciona localmente
- Verifica que no haya errores de TypeScript

## 📝 Próximas Mejoras

- [ ] Agregar imágenes reales de recetas
- [ ] Integrar base de datos para recetas dinámicas
- [ ] Agregar sistema de comentarios
- [ ] Implementar búsqueda
- [ ] Agregar videos
- [ ] Integrar con redes sociales
- [ ] Agregar analytics avanzado

---

¡Tu sitio web profesional está listo! 🎉
